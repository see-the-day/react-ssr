import { createServer } from 'vite';
import { pluginHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { pluginConfig } from './plugin-island/config';

export async function createDevServer(
  root,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
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
