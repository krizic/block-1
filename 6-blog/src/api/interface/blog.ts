import { ImageObject } from "./image";

export interface  IBlog {
  id: number;
  title: string;
  date: string;
  author: string;
  teaser: string;
  created_at: string;
  updated_at: string;
  image: ImageObject[];
}