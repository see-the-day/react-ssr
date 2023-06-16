import { Plugin } from 'vite';
import { readFile } from 'fs/promises';
import { DEFAULT_TEMPLATE_PATH, CLIENT_ENTRY_PATH } from '../constants/index';
export function pluginHtml(): Plugin {
  return {
    name: 'island:index-html',
    apply: 'serve',
    transformIndexHtml(html) {
      console.log(111);
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: { type: 'module', src: `/@fs/${CLIENT_ENTRY_PATH}` },
            injectTo: 'body'
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8');
          try {
            console.log(222);
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            console.log(html);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}