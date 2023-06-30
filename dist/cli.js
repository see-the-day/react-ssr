"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



var _chunkSNWRATW6js = require('./chunk-SNWRATW6.js');



var _chunkUC2GQQ6Gjs = require('./chunk-UC2GQQ6G.js');

// package.json
var require_package = _chunkUC2GQQ6Gjs.__commonJS.call(void 0, {
  "package.json"(exports, module) {
    module.exports = {
      name: "react-ssr",
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        dev: "tsup --watch",
        "prepare:e2e": "tsx scripts/prepare-e2e.ts",
        lint: "eslint --fix --ext .ts,.tsx,.js,.jsx --quiet ./",
        test: 'echo "Error: no test specified" && exit 1',
        start: "tsup --watch",
        build: "tsup",
        prepare: "husky install",
        "test:init": "vitest --ui",
        "test:e2e": "playwright test",
        "test:unit": "vitest run"
      },
      bin: {
        island: "bin/island.js"
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        "@commitlint/cli": "^17.6.5",
        "@commitlint/config-conventional": "^17.6.5",
        "@iconify-json/carbon": "^1.1.18",
        "@loadable/component": "^5.15.3",
        "@playwright/test": "1.26.1",
        "@types/hast": "^2.3.4",
        "@types/mdast": "^3.0.11",
        "@types/node": "^20.2.3",
        "@typescript-eslint/eslint-plugin": "^5.59.9",
        "@typescript-eslint/parser": "^5.59.9",
        "@vitest/ui": "^0.32.0",
        commitlint: "^17.6.5",
        eslint: "^8.42.0",
        "eslint-plugin-react": "^7.32.2",
        "eslint-plugin-react-hooks": "^4.6.0",
        execa: "5.1.1",
        husky: "^8.0.3",
        node: "link:@/types/node",
        ora: "^6.3.1",
        "remark-mdx": "^2.3.0",
        "remark-stringify": "^10.0.3",
        tsup: "^6.7.0",
        tsx: "^3.12.7",
        typescript: "^5.0.4",
        "unist-util-visit": "^4.1.2",
        vitest: "^0.32.0"
      },
      dependencies: {
        "@mdx-js/rollup": "2.1.3",
        "@vitejs/plugin-react": "^2.2.0",
        acorn: "^8.9.0",
        cac: "^6.7.14",
        "eslint-config-prettier": "^8.8.0",
        "eslint-plugin-prettier": "^4.2.1",
        "fast-glob": "^3.2.12",
        "fs-extra": "^11.1.1",
        "github-slugger": "^2.0.0",
        "hast-util-from-html": "^1.0.2",
        "mdast-util-mdxjs-esm": "^1.3.1",
        prettier: "^2.8.8",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "rehype-autolink-headings": "^6.1.1",
        "rehype-slug": "^5.1.0",
        "rehype-stringify": "^9.0.3",
        "remark-frontmatter": "^4.0.1",
        "remark-gfm": "^3.0.1",
        "remark-mdx-frontmatter": "^3.0.0",
        "remark-parse": "^10.0.2",
        "remark-rehype": "^10.1.0",
        rollup: "^3.25.1",
        root: "^3.2.0",
        sass: "^1.63.6",
        shiki: "^0.14.2",
        sirv: "^2.0.3",
        unified: "^10.1.2",
        unocss: "^0.53.4",
        vite: "3.1.4"
      }
    };
  }
});

// src/node/cli.ts
var _cac = require('cac');
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

// src/node/build.ts
var _vite = require('vite');
var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);

async function bundle(root = process.cwd(), config) {
  const resolveViteConfig = async (isServer) => ({
    mode: "production",
    root,
    plugins: await _chunkSNWRATW6js.createVitePlugins.call(void 0, config, void 0, isServer),
    ssr: {
      // 注意加上这个配置，防止 cjs 产物中 require ESM 的产物，因为 react-router-dom 的产物为 ESM 格式
      noExternal: ["react-router-dom"]
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: _path2.default.join(root, isServer ? ".temp" : "build"),
      rollupOptions: {
        input: isServer ? _chunkSNWRATW6js.SERVER_ENTRY_PATH : _chunkSNWRATW6js.CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      _vite.build.call(void 0, await resolveViteConfig(false)),
      // server build
      _vite.build.call(void 0, await resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}
async function renderPage(render, root, clientBundle, routes) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  console.log("Rendering page in server side...");
  await Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      const appHtml = render(routePath);
      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>title</title>
          <meta name="description" content="xxx">
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script type="module" src="/${_optionalChain([clientChunk, 'optionalAccess', _ => _.fileName])}"></script>
        </body>
      </html>`.trim();
      const fileName = routePath.endsWith("/") ? `${routePath}index.html` : `${routePath}.html`;
      await _fsextra2.default.ensureDir(_path.join.call(void 0, root, "build", _path.dirname.call(void 0, fileName)));
      await _fsextra2.default.writeFile(_path.join.call(void 0, root, "build", fileName), html);
    })
  );
  await _fsextra2.default.remove(_path.join.call(void 0, root, ".temp"));
}
async function build(root = process.cwd(), config) {
  const [clientBundle] = await bundle(root, config);
  const serverEntryPath = _path.join.call(void 0, root, ".temp", "ssr-entry.js");
  const { render, routes } = await Promise.resolve().then(() => _interopRequireWildcard(require(serverEntryPath)));
  try {
    await renderPage(render, root, clientBundle, routes);
  } catch (e) {
    console.log("Render page error.\n", e);
  }
}

// src/node/cli.ts
var version = require_package().version;
var cli = _cac.cac.call(void 0, "island").version(version).help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  const createServer = async () => {
    const { createDevServer } = await Promise.resolve().then(() => _interopRequireWildcard(require("./dev.js")));
    const server = await createDevServer(root, async () => {
      await server.close();
      await createServer();
    });
    await server.listen();
    server.printUrls();
  };
  await createServer();
});
cli.command("build [root]", "build for production").action(async (root) => {
  try {
    root = _path.resolve.call(void 0, root);
    const config = await _chunkUC2GQQ6Gjs.resolveConfig.call(void 0, root, "build", "production");
    await build(root, config);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
