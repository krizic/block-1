import PouchDB from "pouchdb";
import {ISessionDb} from "./interfaces";

export class ApiService {
  private db: PouchDB.Database<ISessionDb>;

  private constructor() {
    this.db = new PouchDB("http://localhost:5984/session1", {});
  }

  info() {
    return this.db.info();
  }

  post(data: any) {
    return this.db.post(data);
  }

  getSession(id: string) {
    return this.db.get(id);
  }

  update(document: PouchDB.Core.PutDocument<ISessionDb>) {
    document.last_updated = new Date().getTime();
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
