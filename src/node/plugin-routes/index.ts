import { Plugin } from 'vite';
interface PluginOptions {
  root: string;
}

export const CONVENTIONAL_ROUTE_ID = 'island:rotes';

export function pluginRoutes(option: PluginOptions): Plugin {
  // const rootService = new RouteService(option.root);

  return {
    name: CONVENTIONAL_ROUTE_ID,
    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return `\0${id}`;
      }
    },
    load(id: string) {
      if (id === `\0${CONVENTIONAL_ROUTE_ID}`) {
        return 'export const routes = []';
      }
    }
  };
}
