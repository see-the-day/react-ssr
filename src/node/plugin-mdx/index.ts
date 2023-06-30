import { pluginMdxRollup } from './pluginMdxRollup';
import { Plugin } from 'vite';
import { pluginMdxHmr } from './pluginMdxHmr';
/**
 * 1.监听文件变动
 * 2.定位热更新边界
 * 3.执行更新
 */

export function createPluginMdx(): Plugin[] {
  return [pluginMdxRollup() as unknown as Plugin, pluginMdxHmr()];
}
