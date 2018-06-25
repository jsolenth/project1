const noteStore = require('../services/noteStore');

class NotesController {

    async getNotes(req, res) {
        res.json((await noteStore.all() || []))
    };

    async createNote(req, res) {
        res.json(await noteStore.add(req.body));
    };

    async updateNote(req, res) {
        if(req.body.delete){
            res.json(await noteStore.delete(req.params.id));
        }else{
            res.json(await noteStore.update(req.params.id, req.body));
        }
    };
    async updateNoteAdding(req, res) {
            res.json(await noteStore.updateAdding(req.params.id, req.body));
    };

    async showNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    };

    async deleteNote(req, res) {
        res.json(await noteStore.delete(req.params.id));
    };
}

module.exports = new NotesController();