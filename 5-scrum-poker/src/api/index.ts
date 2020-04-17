import PouchDB from "pouchdb";
import {ISessionDb, IEstimation} from "./interfaces";
import {v4 as uuid} from "uuid";
import {IUserInfo} from "../services";

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
      return this.db.remove({_id: sessionId, _rev: session._rev});
    });
  }

  getEstimation(sessionId: string, estimationId: string) {
    return this.db.get(sessionId).then((session) => {
      return [session.estimations?.[estimationId], session];
    });
  }

  vote(
    sessionId: string,
    estimationId: string,
    userInfo: IUserInfo,
    vote?: string
  ) {
    this.getEstimation(sessionId, estimationId).then(
      ([estimation, session]: [
        IEstimation,
        ISessionDb & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta
      ]) => {
        debugger;
        if ((!vote && !estimation.votes[userInfo.id]) || vote) {
          estimation.votes[userInfo.id] = {
            id: userInfo.id,
            timestamp: new Date().getTime(),
            value: vote,
            voter_username: userInfo.username,
            voter_email: userInfo.email,
          };
          this.updateEstimation(
            {_id: session._id, _rev: session._rev},
            estimation
          );
        }
      }
    );
  }

  createNewEstimation(
    document: PouchDB.Core.PutDocument<ISessionDb>,
    newEstimation: Partial<IEstimation>
  ) {
    const id = uuid();
    const estimations = document.estimations ?? {};
    estimations[id] = {...newEstimation, id} as any;
    document.estimations = estimations;

    return this.db.put(document);
  }

  updateEstimation(
    refDocument: PouchDB.Core.PutDocument<ISessionDb>,
    estimation: IEstimation
  ) {
    if (refDocument._id && refDocument._rev) {
      this.db.get(refDocument._id).then((document) => {
        if (document.estimations) {
          //set all other to inactive
          document.estimations = Object.keys(document.estimations).reduce(
            (next, currentEstKey) => {
              if (next[currentEstKey].id === estimation.id) {
                next[currentEstKey] = estimation;
              } else {
                if (estimation.isActive) {
                  next[currentEstKey].isActive = false;
                }
              }
              return next;
            },
            document.estimations
          );
        } else {
          document.estimations = {[estimation.id!]: estimation};
        }
        return this.db.put(document);
      });
    }
  }

  deleteEstimation(
    refDocument: PouchDB.Core.PutDocument<ISessionDb>,
    estimationId: string
  ) {
    this.db.get(refDocument._id!).then((document) => {
      if (document.estimations) {
        delete document.estimations[estimationId];
        this.db.put(document);
      }
    });
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
