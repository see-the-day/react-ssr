import { usePageData } from '../../runtime';
import { Nav } from '../components/Nav';
import 'uno.css';
import '../styles/base.css';
import '../styles/vars.css';
import { HomeLayout } from './HomeLayout';
import { DocLayout } from './DocLayout';
export function Layout() {
  const pageData = usePageData();
  const { pageType } = pageData;

  const getContent = () => {
    if (pageType === 'home') {
      return (
        <HomeLayout>
          <div>3123</div>
        </HomeLayout>
      );
    } else if (pageType === 'doc') {
      return <DocLayout></DocLayout>;
    } else {
      return <HomeLayout>404</HomeLayout>;
    }
  };
  return (
    <div>
      <Nav></Nav>
      {getContent()}
    </div>
  );
}
