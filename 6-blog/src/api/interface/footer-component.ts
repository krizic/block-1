import { IComponentBase } from "./component-base";

export interface IFooterComponent extends IComponentBase {
  text: string;
  backgroundColor: string;
  height: number;
}