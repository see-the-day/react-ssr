import { Plugin } from 'vite';

export function testPlugin(): Plugin {
  console.log(122313);
  return {
    name: '213123',
    apply: 'serve',
    transformIndexHtml(html) {
      return html;
    }
  };
}
