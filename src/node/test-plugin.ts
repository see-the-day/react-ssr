import { Plugin } from 'vite';

export function testPlugin(): Plugin {
  return {
    name: '213123',
    apply: 'serve',
    transformIndexHtml(html) {
      return html;
    }
  };
}
