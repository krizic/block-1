import { IComponentBase } from "./component-base";

export interface INavigationComponent extends IComponentBase {
  isDarkMode: boolean;
  links: NavigationLinkItem[];
}

interface NavigationLinkItem {
  id: number;
  url: string;
  icon: string;
}