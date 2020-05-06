import { IPage } from './page'

export interface IMenu {
    id: number;
    main: boolean;
    created_at: string;
    updated_at: string;
    items: IMenuItem[];
}

export interface IMenuItem {
    id: number;
    page: IPage;
}

