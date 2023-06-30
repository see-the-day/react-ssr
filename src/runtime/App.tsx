import { matchRoutes } from 'react-router-dom';
import { Layout } from '../theme-default';
import { routes } from 'island:routes';
import siteData from 'island:site-data';

export async function initPageData(routePath: string) {
  const matched = matchRoutes(routes, routePath);
  if (matched) {
    const route = matched[0].route;
    const moduleInfo = await route.preload();
    return {
      pageType: moduleInfo.frontmatter?.pageType ?? 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter,
      pagePath: routePath
    };
  }
  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {}
  };
}
export function App() {
  return <Layout />;
}
