import pluginMdx from '@mdx-js/rollup';
import type { Plugin } from 'vite';
import remarkPluginGFM from 'remark-gfm';
import remarkPluginFrontmatter from 'remark-frontmatter';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import { remarkPluginToc } from './remarkPlugins/toc';
import rehypePluginSlug from 'rehype-slug';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';
import { rehypePluginShiki } from './rehypePlugins/shiki';
import shiki from 'shiki';

export async function pluginMdxRollup(): Promise<Plugin> {
  return pluginMdx({
    remarkPlugins: [
      remarkPluginGFM,
      remarkPluginFrontmatter,
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }],
      remarkPluginToc
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        { highlighter: await shiki.getHighlighter({ theme: 'nord' }) }
      ]
    ]
  });
}
