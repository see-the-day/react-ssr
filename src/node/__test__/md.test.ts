import { unified } from 'unified';
import { describe, test, expect } from 'vitest';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypePluginPreWrapper } from '../plugin-mdx/rehypePlugins/preWrapper';
import shiki from 'shiki';
import { rehypePluginShiki } from '../plugin-mdx/rehypePlugins/shiki';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { remarkPluginToc } from '../plugin-mdx/remarkPlugins/toc';
describe('Markdown compile cases', async () => {
  // 初始化 processor
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await shiki.getHighlighter({ theme: 'nord' })
    })
    .use(rehypeStringify);

  test('Compile title', async () => {
    const mdContent = '# 123';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"');
  });

  test('Compile code', async () => {
    const mdContent = 'I am using `Island.js`';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(
      '"<p>I am using <code>Island.js</code></p>"'
    );
  });

  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre><code class=\\"\\">console.log(123);
      </code></pre></div>"
    `);
  });

  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre class=\\"shiki nord\\" style=\\"background-color: #2e3440ff\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #D8DEE9\\">console</span><span style=\\"color: #ECEFF4\\">.</span><span style=\\"color: #88C0D0\\">log</span><span style=\\"color: #D8DEE9FF\\">(</span><span style=\\"color: #B48EAD\\">123</span><span style=\\"color: #D8DEE9FF\\">)</span><span style=\\"color: #81A1C1\\">;</span></span>
      <span class=\\"line\\"></span></code></pre></div>"
    `);
  });

  test('Compile toc', async () => {
    const remarkProcessor = unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkPluginToc)
      .use(remarkStringify);
    const mdContent = '## title [link](https://1231)';
    const result = remarkProcessor.processSync(mdContent);
    expect(result.value.toString().replace(mdContent, ''))
      .toMatchInlineSnapshot(`
      "

      export const toc = [
        {
          \\"id\\": \\"title-link\\",
          \\"text\\": \\"title link\\",
          \\"depth\\": 2
        }
      ]
      "
    `);
  });
});
