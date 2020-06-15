import fetch from "isomorphic-fetch";

import {IPage} from "./interface/page";
import { env } from '../environments/dev';
import { IBlog } from "./interface/blog";

export class PageService {
  readonly pagesUrl = `${env.apiUrl}/pages`;
  readonly blogssUrl = `${env.apiUrl}/blogs`;

  async getPage(path: string): Promise<IPage[]> {
      const response = await fetch(`${this.pagesUrl}?path=${path}&isPublic=true`);
      return await response.json();
  }

  async getBlogs(): Promise<IBlog[]> {
    const response = await fetch(`${this.blogssUrl}`);
    return await response.json();
}


}
