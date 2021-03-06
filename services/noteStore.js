//Model
const Datastore = require('nedb-promise');

function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

class Note {
    constructor(paramObj) {
        //this.id = makeid();
        this.title = paramObj.title;
        this.description = paramObj.description;
        this.finishedDate = paramObj.finishedDate;
        this.createdDate = paramObj.createdDate;
        this.rating = paramObj.rating;
        this.finished = false;
        this.state = "OK";
    }
}

module.exports = Note;

class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(noteObj) {
        let note = new Note(noteObj);
        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }
    async update(id, noteObj){
        noteObj.state = "OK";
        noteObj.finished = false;
        return await this.db.update({_id: id }, noteObj);
        //return await this.get({_id: id});
    }
    async updateAdding(id, noteObjAdd){
        return await this.db.update({_id: id }, { $set: noteObjAdd });
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.cfind({state: "OK"}).sort({finishedDate: -1}).exec();
    }
}

module.exports = new NoteStore();