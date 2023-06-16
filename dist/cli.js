"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



var _chunk7KRB772Bjs = require('./chunk-7KRB772B.js');



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
        "test:e2e": "playwright test"
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
        "@playwright/test": "1.26.1",
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
        tsup: "^6.7.0",
        tsx: "^3.12.7",
        typescript: "^5.0.4",
        vitest: "^0.32.0"
      },
      dependencies: {
        "@vitejs/plugin-react": "^4.0.0",
        cac: "^6.7.14",
        "eslint-config-prettier": "^8.8.0",
        "eslint-plugin-prettier": "^4.2.1",
        "fs-extra": "^11.1.1",
        prettier: "^2.8.8",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        rollup: "^3.25.1",
        root: "^3.2.0",
        vite: "^4.3.8"
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

var _pluginreact = require('@vitejs/plugin-react'); var _pluginreact2 = _interopRequireDefault(_pluginreact);
async function bundle(root = process.cwd(), config) {
  const resolveViteConfig = (isServer) => ({
    mode: "production",
    root,
    plugins: [_pluginreact2.default.call(void 0, ), _chunk7KRB772Bjs.pluginConfig.call(void 0, config)],
    ssr: {
      // 注意加上这个配置，防止 cjs 产物中 require ESM 的产物，因为 react-router-dom 的产物为 ESM 格式
      noExternal: ["react-router-dom"]
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? _path2.default.join(root, ".temp") : "build",
      rollupOptions: {
        input: isServer ? _chunk7KRB772Bjs.SERVER_ENTRY_PATH : _chunk7KRB772Bjs.CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      _vite.build.call(void 0, resolveViteConfig(false)),
      // server build
      _vite.build.call(void 0, resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}
async function renderPage(render, root, clientBundle) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  console.log("Rendering page in server side...");
  const appHtml = render();
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
  await _fsextra2.default.ensureDir(_path.join.call(void 0, root, "build"));
  await _fsextra2.default.writeFile(_path.join.call(void 0, root, "build/index.html"), html);
  await _fsextra2.default.remove(_path.join.call(void 0, root, ".temp"));
}
async function build(root = process.cwd(), config) {
  const [clientBundle] = await bundle(root, config);
  const serverEntryPath = _path.join.call(void 0, root, ".temp", "ssr-entry.js");
  const { render } = await Promise.resolve().then(() => _interopRequireWildcard(require(serverEntryPath)));
  try {
    await renderPage(render, root, clientBundle);
  } catch (e) {
    console.log("Render page error.\n", e);
  }
}

// src/node/cli.ts
var version = require_package().version;
var cli = _cac.cac.call(void 0, "island").version(version).help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  console.log("dev", root);
  const createServer = async () => {
    const { createDevServer } = await Promise.resolve().then(() => _interopRequireWildcard(require("./dev-6YTFGSIP.js")));
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
  console.log("build", root, 111);
  try {
    root = _path.resolve.call(void 0, root);
    const config = await _chunkUC2GQQ6Gjs.resolveConfig.call(void 0, root, "build", "production");
    await build(root, config);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
