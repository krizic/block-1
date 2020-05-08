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
    // show if available as text if not take title from page.title
    title?: string;
    page?: IPage;
    items: ISubMenuItem[]
}

export interface ISubMenuItem {
    id: number;
    title: string;
    pages?: IPage[];
}

