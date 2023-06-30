import {
  CLIENT_ENTRY_PATH,
  SERVER_ENTRY_PATH,
  createVitePlugins
} from "./chunk-XCEGVIBO.mjs";
import {
  __commonJS,
  resolveConfig
} from "./chunk-4TLH3UBN.mjs";

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
import { cac } from "cac";
import { resolve } from "path";

// src/node/build.ts
import { build as viteBuild } from "vite";
import fs from "fs-extra";
import path, { dirname, join } from "path";
async function bundle(root = process.cwd(), config) {
  const resolveViteConfig = async (isServer) => ({
    mode: "production",
    root,
    plugins: await createVitePlugins(config, void 0, isServer),
    ssr: {
      // 注意加上这个配置，防止 cjs 产物中 require ESM 的产物，因为 react-router-dom 的产物为 ESM 格式
      noExternal: ["react-router-dom"]
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: path.join(root, isServer ? ".temp" : "build"),
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
      viteBuild(await resolveViteConfig(false)),
      // server build
      viteBuild(await resolveViteConfig(true))
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
          <script type="module" src="/${clientChunk?.fileName}"></script>
        </body>
      </html>`.trim();
      const fileName = routePath.endsWith("/") ? `${routePath}index.html` : `${routePath}.html`;
      await fs.ensureDir(join(root, "build", dirname(fileName)));
      await fs.writeFile(join(root, "build", fileName), html);
    })
  );
  await fs.remove(join(root, ".temp"));
}
async function build(root = process.cwd(), config) {
  const [clientBundle] = await bundle(root, config);
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");
  const { render, routes } = await import(serverEntryPath);
  try {
    await renderPage(render, root, clientBundle, routes);
  } catch (e) {
    console.log("Render page error.\n", e);
  }
}

// src/node/cli.ts
var version = require_package().version;
var cli = cac("island").version(version).help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  const createServer = async () => {
    const { createDevServer } = await import("./dev.mjs");
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
    root = resolve(root);
    const config = await resolveConfig(root, "build", "production");
    await build(root, config);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
