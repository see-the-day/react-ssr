import { SidebarGroup } from 'shared/types';

interface SideBarProps {
  sideBarData: SidebarGroup[];
  pathname: string;
}
export function SideBar(props: SideBarProps) {
  return <div>Sidebar</div>;
}
