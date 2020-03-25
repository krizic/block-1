
export interface IDoc {
    _rev: string;
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
    _id: string;
}


export type IFindChatResponse = IFindResponse<IChat>;
