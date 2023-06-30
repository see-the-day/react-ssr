import {
  PACKAGE_ROOT,
  createVitePlugins
} from "./chunk-2AD4RM2V.mjs";
import {
  resolveConfig
} from "./chunk-4TLH3UBN.mjs";

// src/node/dev.ts
import { createServer } from "vite";
async function createDevServer(root, restartServer) {
  const config = await resolveConfig(root, "serve", "development");
  return createServer({
    plugins: createVitePlugins(config, restartServer),
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
