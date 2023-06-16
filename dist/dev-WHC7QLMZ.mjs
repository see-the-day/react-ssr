import {
  CLIENT_ENTRY_PATH,
  DEFAULT_TEMPLATE_PATH,
  PACKAGE_ROOT,
  pluginConfig
} from "./chunk-V34WZVGQ.mjs";
import {
  resolveConfig
} from "./chunk-VVKJNC2J.mjs";

// src/node/dev.ts
import { createServer } from "vite";

// src/node/plugin-island/indexHtml.ts
import { readFile } from "fs/promises";
function pluginHtml() {
  return {
    name: "island:index-html",
    apply: "serve",
    transformIndexHtml(html) {
      console.log(111);
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
          let html = await readFile(DEFAULT_TEMPLATE_PATH, "utf-8");
          try {
            console.log(222);
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            console.log(html);
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

// src/node/dev.ts
import pluginReact from "@vitejs/plugin-react";
async function createDevServer(root, restartServer) {
  const config = await resolveConfig(root, "serve", "development");
  console.log(config);
  return createServer({
    root: PACKAGE_ROOT,
    plugins: [pluginHtml(), pluginReact(), pluginConfig(config, restartServer)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
export {
  createDevServer
};
