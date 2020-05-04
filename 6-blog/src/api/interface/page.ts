import { IComponentBase } from "./component-base";

export interface IPage {
  id: string;
  title: string;
  content: string;
  components: IComponentBase[];
  page: string;
  path: string;
  isPublic: boolean;
}


