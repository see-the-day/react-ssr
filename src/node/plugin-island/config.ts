import { relative } from 'path';
import { Plugin } from 'vite';
import { SiteConfig } from 'shared/types/index';
import { PACKAGE_ROOT } from '../../node/constants';
import { join } from 'path';
import sirv from 'sirv';
const SITE_DATA_ID = 'island:site-data';

export function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  return {
    name: 'island:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        }
      };
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file));

      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        );
        await restartServer();
        // 重点: 重启 Dev Server
      }
    },
    configureServer(server) {
      const publicDir = join(config.root, 'public');
      server.middlewares.use(sirv(publicDir));
    }
  };
}
