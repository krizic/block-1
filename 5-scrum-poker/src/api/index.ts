import PouchDB from 'pouchdb';


export class ApiService {

    private db: PouchDB.Database = new PouchDB('http://localhost:5984/session1');

    info(){
        return this.db.info();
    }

    post(data: any) {
        this.db.post(data);
    }

}