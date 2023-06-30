"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkSNWRATW6js = require('./chunk-SNWRATW6.js');


var _chunkUC2GQQ6Gjs = require('./chunk-UC2GQQ6G.js');

// src/node/dev.ts
var _vite = require('vite');
async function createDevServer(root, restartServer) {
  const config = await _chunkUC2GQQ6Gjs.resolveConfig.call(void 0, root, "serve", "development");
  return _vite.createServer.call(void 0, {
    plugins: _chunkSNWRATW6js.createVitePlugins.call(void 0, config, restartServer),
    server: {
      fs: {
        allow: [_chunkSNWRATW6js.PACKAGE_ROOT]
      }
    }
  });
}


exports.createDevServer = createDevServer;
