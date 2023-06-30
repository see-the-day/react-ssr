import { usePageData } from '../../runtime';
import { Nav } from '../components/Nav';
import 'uno.css';
import '../styles/base.css';
import '../styles/vars.css';
import { HomeLayout } from './HomeLayout';
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
      return <HomeLayout>222</HomeLayout>;
    } else {
      return <HomeLayout>404</HomeLayout>;
    }
  };
  return (
    <div>
      {getContent()}
      <Nav></Nav>
    </div>
  );
}
