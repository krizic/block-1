import PouchDB from "pouchdb";
import {ISessionDb, IEstimation} from "./interfaces";
import {v4 as uuid} from "uuid";

export class ApiService {
  private db: PouchDB.Database<ISessionDb>;

  private constructor() {
    this.db = new PouchDB("http://localhost:5984/session1", {});
  }

  info() {
    return this.db.info();
  }

  post(data: Partial<ISessionDb>) {
    return this.db.post(data);
  }

  getSession(sessionId: string) {
    return this.db.get(sessionId);
  }

  update(document: PouchDB.Core.PutDocument<ISessionDb>) {
    document.last_updated = new Date().getTime();
    return this.db.put(document);
  }

  delete(sessionId: string) {
    return this.getSession(sessionId).then((session) => {
      return this.db.remove({_id: sessionId, _rev: session._rev})
    })
  }

  createNewEstimation(document: PouchDB.Core.PutDocument<ISessionDb>, newEstimation: IEstimation){
    const id = uuid();
    const estimations = document.estimations ?? {};
    estimations[id] = {...newEstimation, id}
    document.estimations = estimations;

    return this.db.put(document);
  }

  onChange(
    callback: (change?: PouchDB.Core.ChangesResponseChange<ISessionDb>) => any
  ) {
    this.db
      .changes({
        since: "now",
        live: true,
      })
      .on("change", (change) => {
        callback(change);
      });
  }

  // Singleton set up
  private static _instance: ApiService;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
