"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/node/constants/index.ts
var _path = require('path'); var path = _interopRequireWildcard(_path);
var PACKAGE_ROOT = path.join(__dirname, "..");
var DEFAULT_TEMPLATE_PATH = path.join(PACKAGE_ROOT, "template.html");
var CLIENT_ENTRY_PATH = path.join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "client-entry.tsx"
);
var SERVER_ENTRY_PATH = path.join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "ssr-entry.tsx"
);

// src/node/plugin-island/indexHtml.ts
var _promises = require('fs/promises');
function pluginHtml() {
  return {
    name: "island:index-html",
    apply: "serve",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: { type: "module", src: `/@fs/${CLIENT_ENTRY_PATH}` },
            injectTo: "body"
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await _promises.readFile.call(void 0, DEFAULT_TEMPLATE_PATH, "utf-8");
          try {
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}

// src/node/vitePlugins.ts
var _pluginreact = require('@vitejs/plugin-react'); var _pluginreact2 = _interopRequireDefault(_pluginreact);

// src/node/plugin-island/config.ts


var _sirv = require('sirv'); var _sirv2 = _interopRequireDefault(_sirv);
var SITE_DATA_ID = "island:site-data";
function pluginConfig(config, restartServer) {
  return {
    name: "island:config",
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return "\0" + SITE_DATA_ID;
      }
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly"
      }
    },
    load(id) {
      if (id === "\0" + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            "@runtime": _path.join.call(void 0, PACKAGE_ROOT, "src", "runtime", "index.ts")
          }
        }
      };
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const include = (id) => customWatchedFiles.some((file) => id.includes(file));
      if (include(ctx.file)) {
        console.log(
          `
${_path.relative.call(void 0, config.root, ctx.file)} changed, restarting server...`
        );
        await restartServer();
      }
    },
    configureServer(server) {
      const publicDir = _path.join.call(void 0, config.root, "public");
      server.middlewares.use(_sirv2.default.call(void 0, publicDir));
    }
  };
}

// src/node/plugin-routes/RouteService.ts
var _fastglob = require('fast-glob'); var _fastglob2 = _interopRequireDefault(_fastglob);
var _vite = require('vite');

var RouteService = class {
  #scanDir;
  #routeData = [];
  constructor(scanDir) {
    this.#scanDir = scanDir;
  }
  async init() {
    const files = _fastglob2.default.sync(["**/*.{js,jsx,ts,tsx,md,mdx}"], {
      cwd: this.#scanDir,
      absolute: true,
      ignore: ["**/node_modules/**", "**/build/**", "config.ts"]
    }).sort();
    files.forEach((file) => {
      const fileRelativePath = _vite.normalizePath.call(void 0, 
        path.default.relative(this.#scanDir, file)
      );
      const routePath = this.normalizeRoutePath(fileRelativePath);
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
  }
  getRouteMeta() {
    return this.#routeData;
  }
  normalizeRoutePath(rawPath) {
    const routePath = rawPath.replace(/\.(.*)?$/, "").replace(/index$/, "");
    return routePath.startsWith("/") ? routePath : `/${routePath}`;
  }
  generateRoutesCode(ssr = false) {
    return `
      import React from 'react';
      ${ssr ? "" : 'import loadable from "@loadable/component";'}
      ${this.#routeData.map((route, index) => {
      return ssr ? `import Route${index} from "${route.absolutePath}"` : `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
    }).join("\n")}
      export const routes = [
        ${this.#routeData.map((route, index) => {
      return `{ 
              path: '${route.routePath}', 
              element: React.createElement(Route${index}),
              preload: () => import('${route.absolutePath}')
            }`;
    }).join(",\n")}
      ];
    `;
  }
};

// src/node/plugin-routes/index.ts
var CONVENTIONAL_ROUTE_ID = "island:routes";
function pluginRoutes(option) {
  const routeService = new RouteService(option.root);
  return {
    name: CONVENTIONAL_ROUTE_ID,
    async configResolved() {
      await routeService.init();
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return `\0${id}`;
      }
    },
    load(id) {
      if (id === `\0${CONVENTIONAL_ROUTE_ID}`) {
        return routeService.generateRoutesCode(option.isSSR || false);
      }
    }
  };
}

// src/node/plugin-mdx/pluginMdxRollup.ts
var _rollup = require('@mdx-js/rollup'); var _rollup2 = _interopRequireDefault(_rollup);
var _remarkgfm = require('remark-gfm'); var _remarkgfm2 = _interopRequireDefault(_remarkgfm);
var _remarkfrontmatter = require('remark-frontmatter'); var _remarkfrontmatter2 = _interopRequireDefault(_remarkfrontmatter);
var _remarkmdxfrontmatter = require('remark-mdx-frontmatter'); var _remarkmdxfrontmatter2 = _interopRequireDefault(_remarkmdxfrontmatter);

// node_modules/.pnpm/registry.npmmirror.com+unist-util-is@5.2.1/node_modules/unist-util-is/lib/index.js
var convert = (
  /**
   * @type {(
   *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {AssertAnything}
   */
  function(test) {
    if (test === void 0 || test === null) {
      return ok;
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all);
  function all(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(node, ...parameters) {
    return Boolean(
      node && typeof node === "object" && "type" in node && // @ts-expect-error: fine.
      Boolean(check.call(this, node, ...parameters))
    );
  }
}
function ok() {
  return true;
}

// node_modules/.pnpm/registry.npmmirror.com+unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/color.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// node_modules/.pnpm/registry.npmmirror.com+unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/index.js
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
var visitParents = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {Visitor<Node>} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {void}
   */
  function(tree, test, visitor, reverse) {
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
      test = null;
    }
    const is2 = convert(test);
    const step = reverse ? -1 : 1;
    factory(tree, void 0, [])();
    function factory(node, index, parents) {
      const value = node && typeof node === "object" ? node : {};
      if (typeof value.type === "string") {
        const name = (
          // `hast`
          typeof value.tagName === "string" ? value.tagName : (
            // `xast`
            typeof value.name === "string" ? value.name : void 0
          )
        );
        Object.defineProperty(visit2, "name", {
          value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")"
        });
      }
      return visit2;
      function visit2() {
        let result = [];
        let subresult;
        let offset;
        let grandparents;
        if (!test || is2(node, index, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if (node.children && result[0] !== SKIP) {
          offset = (reverse ? node.children.length : -1) + step;
          grandparents = parents.concat(node);
          while (offset > -1 && offset < node.children.length) {
            subresult = factory(node.children[offset], offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
        return result;
      }
    }
  }
);
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}

// node_modules/.pnpm/registry.npmmirror.com+unist-util-visit@4.1.2/node_modules/unist-util-visit/lib/index.js
var visit = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {Visitor} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {void}
   */
  function(tree, test, visitor, reverse) {
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
      test = null;
    }
    visitParents(tree, test, overload, reverse);
    function overload(node, parents) {
      const parent = parents[parents.length - 1];
      return visitor(
        node,
        parent ? parent.children.indexOf(node) : null,
        parent
      );
    }
  }
);

// src/node/plugin-mdx/remarkPlugins/toc.ts
var _githubslugger = require('github-slugger'); var _githubslugger2 = _interopRequireDefault(_githubslugger);
var _acorn = require('acorn');
var slugger = new (0, _githubslugger2.default)();
var remarkPluginToc = () => {
  return (tree) => {
    const toc = [];
    visit(tree, "heading", (node) => {
      if (!node.depth || !_optionalChain([node, 'access', _ => _.children, 'optionalAccess', _2 => _2.length])) {
        return;
      }
      if (node.depth > 1 && node.depth < 5) {
        const originalText = node.children.map((child) => {
          switch (child.type) {
            case "link":
              return _optionalChain([child, 'access', _3 => _3.children, 'optionalAccess', _4 => _4.map, 'call', _5 => _5((c) => c.value), 'access', _6 => _6.join, 'call', _7 => _7("")]);
            default:
              return child.value;
          }
        }).join("");
        const id = slugger.slug(originalText);
        toc.push({ id, text: originalText, depth: node.depth });
      }
    });
    const insertedCode = `export const toc = ${JSON.stringify(toc, null, 2)}`;
    tree.children.push({
      type: "mdxjsEsm",
      value: insertedCode,
      data: {
        estree: _acorn.parse.call(void 0, insertedCode, {
          ecmaVersion: 2020,
          sourceType: "module"
        })
      }
    });
  };
};

// src/node/plugin-mdx/pluginMdxRollup.ts
var _rehypeslug = require('rehype-slug'); var _rehypeslug2 = _interopRequireDefault(_rehypeslug);
var _rehypeautolinkheadings = require('rehype-autolink-headings'); var _rehypeautolinkheadings2 = _interopRequireDefault(_rehypeautolinkheadings);

// src/node/plugin-mdx/rehypePlugins/preWrapper.ts
var rehypePluginPreWrapper = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "pre" && _optionalChain([node, 'access', _8 => _8.children, 'access', _9 => _9[0], 'optionalAccess', _10 => _10.type]) === "element" && node.children[0].tagName === "code" && !_optionalChain([node, 'access', _11 => _11.data, 'optionalAccess', _12 => _12.isVisited])) {
        const codeNode = node.children[0];
        const codeClassName = _optionalChain([codeNode, 'access', _13 => _13.properties, 'optionalAccess', _14 => _14.className, 'optionalAccess', _15 => _15.toString, 'call', _16 => _16()]) || "";
        const lang = codeClassName.split("-")[1];
        const clonedNode = {
          type: "element",
          tagName: "pre",
          children: node.children,
          data: {
            isVisited: true
          }
        };
        node.tagName = "div";
        node.properties = node.properties || {};
        node.properties.className = codeClassName;
        node.children = [
          {
            type: "element",
            tagName: "span",
            properties: {
              className: "lang"
            },
            children: [
              {
                type: "text",
                value: lang
              }
            ]
          },
          clonedNode
        ];
      }
    });
  };
};

// src/node/plugin-mdx/rehypePlugins/shiki.ts
var _hastutilfromhtml = require('hast-util-from-html');
var rehypePluginShiki = ({ highlighter }) => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "pre" && _optionalChain([node, 'access', _17 => _17.children, 'access', _18 => _18[0], 'optionalAccess', _19 => _19.type]) === "element" && node.children[0].tagName === "code") {
        const codeNode = node.children[0];
        const codeContent = codeNode.children[0].value;
        const codeClassName = _optionalChain([codeNode, 'access', _20 => _20.properties, 'optionalAccess', _21 => _21.className, 'optionalAccess', _22 => _22.toString, 'call', _23 => _23()]) || "";
        const lang = codeClassName.split("-")[1];
        if (!lang) {
          return;
        }
        const highlightedCode = highlighter.codeToHtml(codeContent, { lang });
        const fragmentAst = _hastutilfromhtml.fromHtml.call(void 0, highlightedCode, { fragment: true });
        parent.children.splice(index, 1, ...fragmentAst.children);
      }
    });
  };
};

// src/node/plugin-mdx/pluginMdxRollup.ts
var _shiki = require('shiki'); var _shiki2 = _interopRequireDefault(_shiki);
async function pluginMdxRollup() {
  return _rollup2.default.call(void 0, {
    remarkPlugins: [
      _remarkgfm2.default,
      _remarkfrontmatter2.default,
      [_remarkmdxfrontmatter2.default, { name: "frontmatter" }],
      remarkPluginToc
    ],
    rehypePlugins: [
      _rehypeslug2.default,
      [
        _rehypeautolinkheadings2.default,
        {
          properties: {
            class: "header-anchor"
          },
          content: {
            type: "text",
            value: "#"
          }
        }
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        { highlighter: await _shiki2.default.getHighlighter({ theme: "nord" }) }
      ]
    ]
  });
}

// src/node/plugin-mdx/pluginMdxHmr.ts
var _assert = require('assert'); var _assert2 = _interopRequireDefault(_assert);
function pluginMdxHmr() {
  let viteReactPlugin;
  return {
    name: "vite-plugin-mdx-hmr",
    apply: "serve",
    configResolved(config) {
      viteReactPlugin = config.plugins.find(
        (plugin) => plugin.name === "vite:react-babel"
      );
    },
    async transform(code, id, opts) {
      if (/\.mdx?$/.test(id)) {
        _assert2.default.call(void 0, typeof viteReactPlugin.transform === "function");
        const result = await _optionalChain([viteReactPlugin, 'optionalAccess', _24 => _24.transform, 'access', _25 => _25.call, 'call', _26 => _26(
          this,
          code,
          id + "?.jsx",
          opts
        )]);
        const selfAcceptCode = "import.meta.hot.accept();";
        if (typeof result === "object" && !_optionalChain([result, 'access', _27 => _27.code, 'optionalAccess', _28 => _28.includes, 'call', _29 => _29(selfAcceptCode)])) {
          result.code += selfAcceptCode;
        }
        return result;
      }
    }
  };
}

// src/node/plugin-mdx/index.ts
function createPluginMdx() {
  return [pluginMdxRollup(), pluginMdxHmr()];
}

// src/node/test-plugin.ts
function testPlugin() {
  return {
    name: "213123",
    apply: "serve",
    transformIndexHtml(html) {
      return html;
    }
  };
}

// src/node/vitePlugins.ts
var _vite3 = require('unocss/vite'); var _vite4 = _interopRequireDefault(_vite3);

// src/node/unocssOptions.ts
var _unocss = require('unocss');
var options = {
  presets: [_unocss.presetAttributify.call(void 0, ), _unocss.presetWind.call(void 0, {}), _unocss.presetIcons.call(void 0, )],
  shortcuts: {
    "flex-center": "flex justify-center items-center"
  },
  theme: {
    colors: {
      brandLight: "var(--island-c-brand-light)",
      brandDark: "var(--island-c-brand-dark)",
      brand: "var(--island-c-brand)",
      text: {
        1: "var(--island-c-text-1)",
        2: "var(--island-c-text-2)",
        3: "var(--island-c-text-3)",
        4: "var(--island-c-text-4)"
      },
      divider: {
        default: "var(--island-c-divider)",
        light: "var(--island-c-divider-light)",
        dark: "var(--island-c-divider-dark)"
      },
      gray: {
        light: {
          1: "var(--island-c-gray-light-1)",
          2: "var(--island-c-gray-light-2)",
          3: "var(--island-c-gray-light-3)",
          4: "var(--island-c-gray-light-4)"
        }
      },
      bg: {
        default: "var(--island-c-bg)",
        soft: "var(--island-c-bg-soft)",
        mute: "var(--island-c-bg-mute)"
      }
    }
  },
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: "1px solid var(--island-c-divider-light)"
      })
    ],
    [
      "menu-item-before",
      {
        "margin-right": "12px",
        "margin-left": "12px",
        width: "1px",
        height: "24px",
        "background-color": "var(--island-c-divider-light)",
        content: '" "'
      }
    ]
  ]
};
var unocssOptions_default = options;

// src/node/vitePlugins.ts
function createVitePlugins(config, restartServer, isSSR = false) {
  return [
    _vite4.default.call(void 0, unocssOptions_default),
    pluginHtml(),
    testPlugin(),
    _pluginreact2.default.call(void 0, {
      jsxRuntime: "automatic"
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR
    }),
    createPluginMdx()
  ];
}






exports.PACKAGE_ROOT = PACKAGE_ROOT; exports.CLIENT_ENTRY_PATH = CLIENT_ENTRY_PATH; exports.SERVER_ENTRY_PATH = SERVER_ENTRY_PATH; exports.createVitePlugins = createVitePlugins;
