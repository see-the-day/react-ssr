"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }




var _chunk7KRB772Bjs = require('./chunk-7KRB772B.js');


var _chunkUC2GQQ6Gjs = require('./chunk-UC2GQQ6G.js');

// src/node/dev.ts
var _vite = require('vite');

// src/node/plugin-island/indexHtml.ts
var _promises = require('fs/promises');
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
            attrs: { type: "module", src: `/@fs/${_chunk7KRB772Bjs.CLIENT_ENTRY_PATH}` },
            injectTo: "body"
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await _promises.readFile.call(void 0, _chunk7KRB772Bjs.DEFAULT_TEMPLATE_PATH, "utf-8");
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
var _pluginreact = require('@vitejs/plugin-react'); var _pluginreact2 = _interopRequireDefault(_pluginreact);
async function createDevServer(root, restartServer) {
  const config = await _chunkUC2GQQ6Gjs.resolveConfig.call(void 0, root, "serve", "development");
  console.log(config);
  return _vite.createServer.call(void 0, {
    root: _chunk7KRB772Bjs.PACKAGE_ROOT,
    plugins: [pluginHtml(), _pluginreact2.default.call(void 0, ), _chunk7KRB772Bjs.pluginConfig.call(void 0, config, restartServer)],
    server: {
      fs: {
        allow: [_chunk7KRB772Bjs.PACKAGE_ROOT]
      }
    }
  });
}


exports.createDevServer = createDevServer;
