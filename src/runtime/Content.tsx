import { useRoutes } from 'react-router-dom';
import A from '../../docs/guide/a';
import B from '../../docs/guide/b';
import Index from '../../docs/guide/index';

const routes = [
  { path: '/guide', element: <Index></Index> },
  { path: '/guide/a', element: <A></A> },
  { path: '/guide/b', element: <B></B> }
];

export const Content = () => useRoutes(routes);
