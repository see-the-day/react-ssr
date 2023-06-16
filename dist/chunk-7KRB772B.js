"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }// src/node/constants/index.ts
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

// src/node/plugin-island/config.ts


var SITE_DATA_ID = "island:site-data";
function pluginConfig(config, restartServer) {
  return {
    name: "island:config",
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return "\0" + SITE_DATA_ID;
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
    }
  };
}







exports.PACKAGE_ROOT = PACKAGE_ROOT; exports.DEFAULT_TEMPLATE_PATH = DEFAULT_TEMPLATE_PATH; exports.CLIENT_ENTRY_PATH = CLIENT_ENTRY_PATH; exports.SERVER_ENTRY_PATH = SERVER_ENTRY_PATH; exports.pluginConfig = pluginConfig;
