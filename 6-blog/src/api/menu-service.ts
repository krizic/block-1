import fetch from 'isomorphic-fetch';

import { env } from '../environments/dev';
import { IMenu } from './interface/menu';

export class MenuService {
    readonly menuUrl = `${env.apiUrl}/menus`;

    public async getMenu(): Promise<IMenu[]> {
        const response = await fetch(`${this.menuUrl}`);
        return response.json();
    }
}

