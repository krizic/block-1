
export interface IDoc {
    _rev?: string;
    _id?: string;
}

export interface IFindResponse<T> {
    docs: T[];
    bookmark: string;
    warning: string;
}

////////////////////////////////////////////////////////

export interface IChat extends IDoc {
    msg: string;
    sender: string;
    timestamp: number;
}


export type IFindChatResponse = IFindResponse<IChat>;
