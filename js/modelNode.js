/**
 *
 * Model
 */
const notesRepo = (function(){
    "use strict";

    const storage = noteStorage.getAll();

    //fill if empty
    /*if (storage.length === 0) {
        addNote({title: "My New Post", description: "This is my first post!", finishedDate:'2018.06.01',createdDate:'',rating:1})

    }*/

    class Note{
        constructor(paramObj){
            this.id = makeid();
            this.title = paramObj.title;
            this.description = paramObj.description;
            this.finishedDate = paramObj.finishedDate;
            this.createdDate = paramObj.createdDate;
            this.rating = paramObj.rating;
        }
        update(paramObj){
            this.title = paramObj.title;
            this.description = paramObj.description;
            this.finishedDate = paramObj.finishedDate;
            this.createdDate = paramObj.createdDate;
            this.rating = paramObj.rating;
        }
    }
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    //get Notes (order, filter)
    function getStorage(orderStr, filterStr) {
        if(orderStr){
            return storage.sortByProb(orderStr);
        }else {
            return storage;
        }

    }

    function addNote(paramObj){
        let note = new Note(paramObj);//TODO: eventuell gleich mehere Params
        storage.push(note);
        noteStorage.persist(storage);
        return note;
    }
    function updateNotes(note, paramObj){
        note.title = paramObj.title
        note.title = paramObj.title;
        note.description = paramObj.description;
        note.finishedDate = paramObj.finishedDate;
        note.createdDate = paramObj.createdDate;
        note.rating = paramObj.rating;
        //note.update(paramObj); //TODO: wieso geht das nich über die object methode?
        noteStorage.persist(storage);

    }
    function getNoteById(id){
        let note = storage.findById(id)
        return note;
    }
    return {getStorage, addNote, getNoteById, updateNotes};
})();

const styleRepo = (function(){
    "use strict";

    const storageOfStyle = styleStorage.getAll();

    //fill if empty
    if (storageOfStyle.length === 0) {

        storageOfStyle.push({value: "dark-layout", name:"Style 1", default:true});
        storageOfStyle.push({value: "light-layout", name:"Style 2", default:false});
        styleStorage.persist(storageOfStyle);
    }

    function changeDefaultStyle(defaultValue){
        let list = storageOfStyle;
        for (let i = 0; i < list.length; ++i) {
            if(list[i].value == defaultValue){
                list[i].default = true;
            }else{
                list[i].default = false;
            }
        }
        styleStorage.persist(storageOfStyle);
    }
    function getAllStyleValues(){
        let list = storageOfStyle;

        return list.map(x => x.value)
    }
    function getDefault(){
        let list = storageOfStyle;
        for (let i = 0; i < list.length; ++i) {
            if(list[i].default){
                return list[i]
            }
        }
        return null;
    }

    function getStorage() {
        return storageOfStyle;
    }
    return {getStorage, changeDefaultStyle, getDefault, getAllStyleValues};
})();




