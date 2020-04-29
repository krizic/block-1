import fetch from "isomorphic-fetch";

import {IPage} from "./interface/page";
import { env } from '../environments/dev';

export class PageService {
  readonly pagesUrl = `${env.apiUrl}/pages`;

  async getPage(path: string): Promise<IPage[]> {
      const response = await fetch(`${this.pagesUrl}?path=${path}&isPublic=true`);
      return await response.json();
  }
}
