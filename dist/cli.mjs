import {
  CLIENT_ENTRY_PATH,
  SERVER_ENTRY_PATH,
  pluginConfig
} from "./chunk-V34WZVGQ.mjs";
import {
  __commonJS,
  resolveConfig
} from "./chunk-VVKJNC2J.mjs";

// package.json
var require_package = __commonJS({
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
import { cac } from "cac";
import { resolve } from "path";

// src/node/build.ts
import { build as viteBuild } from "vite";
import fs from "fs-extra";
import path, { join } from "path";
import pluginReact from "@vitejs/plugin-react";
async function bundle(root = process.cwd(), config) {
  const resolveViteConfig = (isServer) => ({
    mode: "production",
    root,
    plugins: [pluginReact(), pluginConfig(config)],
    ssr: {
      // 注意加上这个配置，防止 cjs 产物中 require ESM 的产物，因为 react-router-dom 的产物为 ESM 格式
      noExternal: ["react-router-dom"]
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? path.join(root, ".temp") : "build",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false)),
      // server build
      viteBuild(resolveViteConfig(true))
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
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
  await fs.ensureDir(join(root, "build"));
  await fs.writeFile(join(root, "build/index.html"), html);
  await fs.remove(join(root, ".temp"));
}
async function build(root = process.cwd(), config) {
  const [clientBundle] = await bundle(root, config);
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");
  const { render } = await import(serverEntryPath);
  try {
    await renderPage(render, root, clientBundle);
  } catch (e) {
    console.log("Render page error.\n", e);
  }
}

// src/node/cli.ts
var version = require_package().version;
var cli = cac("island").version(version).help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  console.log("dev", root);
  const createServer = async () => {
    const { createDevServer } = await import("./dev-WHC7QLMZ.mjs");
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
    root = resolve(root);
    const config = await resolveConfig(root, "build", "production");
    await build(root, config);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
