import { ImageObject } from "./image";
import { IPage } from "./page";
import { IComponentBase } from "./component-base";

export interface ICardsComponent extends IComponentBase {
  description: string;
  items: ICardItem[];
}

export interface ICardItem {
  id: number;
  alt: string;
  page: IPage;
  image: ImageObject;
}