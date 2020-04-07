export interface ISessionDb {
    session_name?: string;
    session_pin?: string;
    last_updated?: number;
    created_at?: number;
    estimations?: {[key: string]:  IEstimation}
}

export interface IEstimation{
    id?: string;
    timestamp: number;
    name: string;
    description?: string;

}
