import { usePageData } from '@runtime';
import { useLocation } from 'react-router-dom';
import { SideBar } from '../../components/SideBar';

export function DocLayout() {
  const { siteData } = usePageData();
  const sitebarData = siteData.themeConfig?.sidebar || {};

  const { pathname } = useLocation();
  const matcheSidebarKey = Object.keys(sitebarData).find((key) => {
    if (pathname.startsWith(key)) {
      return true;
    }
  });
  const matcheSidebar = sitebarData[matcheSidebarKey] || [];

  return (
    <div>
      <SideBar sideBarData={matcheSidebar} pathname={pathname}></SideBar>
    </div>
  );
}
