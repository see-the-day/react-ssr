import fastGlob from 'fast-glob';
import { normalizePath } from 'vite';
import path from 'path';

interface RouteMeta {
  routePath: string;
  absolutePath: string;
}

export class RouteService {
  #scanDir: string;
  #routeData: RouteMeta[] = [];
  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }
  async init() {
    const files = fastGlob
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/build/**', 'config.ts']
      })
      .sort();
    console.log(files);
    files.forEach((file: string) => {
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      );
      const routePath = this.normalizeRoutePath(fileRelativePath);
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
    console.log(this.#routeData);
  }
  getRouteMeta(): RouteMeta[] {
    return this.#routeData;
  }
  normalizeRoutePath(rawPath: string): string {
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '');
    return routePath.startsWith('/') ? routePath : `/${routePath}`;
  }
}
