"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk7DH27B3Yjs = require('./chunk-7DH27B3Y.js');


var _chunkUC2GQQ6Gjs = require('./chunk-UC2GQQ6G.js');

// src/node/dev.ts
var _vite = require('vite');
async function createDevServer(root, restartServer) {
  const config = await _chunkUC2GQQ6Gjs.resolveConfig.call(void 0, root, "serve", "development");
  return _vite.createServer.call(void 0, {
    plugins: _chunk7DH27B3Yjs.createVitePlugins.call(void 0, config, restartServer),
    server: {
      fs: {
        allow: [_chunk7DH27B3Yjs.PACKAGE_ROOT]
      }
    }
  });
}


exports.createDevServer = createDevServer;
