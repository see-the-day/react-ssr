import { Plugin } from 'vite';
import { RouteService } from './RouteService';
import React from 'react';
import { PageModule } from 'shared/types';
export interface Route {
  path: string;
  element: React.ReactElement;
  filePath: string;
  preload: () => Promise<PageModule>;
}

interface PluginOptions {
  root: string;
  isSSR: boolean;
}

export const CONVENTIONAL_ROUTE_ID = 'island:routes';

export function pluginRoutes(option: PluginOptions): Plugin {
  const routeService = new RouteService(option.root);

  return {
    name: CONVENTIONAL_ROUTE_ID,
    async configResolved() {
      // Vite 启动时，对 RouteService 进行初始化
      await routeService.init();
    },
    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return `\0${id}`;
      }
    },
    load(id: string) {
      if (id === `\0${CONVENTIONAL_ROUTE_ID}`) {
        return routeService.generateRoutesCode(option.isSSR || false);
      }
    }
  };
}
