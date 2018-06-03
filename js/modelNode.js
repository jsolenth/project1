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
    }
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function getStorage() {
        return storage;
    }

    function addNote(paramObj){
        let note = new Note(paramObj);//TODO: eventuell gleich mehere Params
        storage.push(note);
        noteStorage.persist(storage);
        return note;
    }

    return {getStorage, addNote };
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

    function getStorage() {
        return storageOfStyle;
    }
    return {getStorage, changeDefaultStyle};
})();




