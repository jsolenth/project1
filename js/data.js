//TODO: eventuell zusammenfassen

/**
 * Note Storage
 */
const noteStorage = (function(){
    "use strict";

    let storage = readFromLocalStorage();
    writeToLocalStorage(storage);

    function getAll() {
        return storage;
    }
    function persist(toPersist) {
        storage = toPersist;
        writeToLocalStorage(storage);
    }
    function readFromLocalStorage(toPersist) {
        return JSON.parse(localStorage.getItem("noteStorage") || "[ ]");
    }
    function writeToLocalStorage(toPersist) {
        localStorage.setItem("noteStorage", JSON.stringify(toPersist));
    }

    return { getAll, persist };// zur verfügung stellen nach aussen

}()); //Idiom: Immediately-invoked Function Expression (IIFE)

/**
 * Style Storage
 */
const styleStorage = (function(){
    "use strict";

    let storage = readFromLocalStorage();
    writeToLocalStorage(storage);

    function getAll() {
        return storage;
    }
    function persist(toPersist) {
        storage = toPersist;
        writeToLocalStorage(storage);
    }
    function readFromLocalStorage(toPersist) {
        return JSON.parse(localStorage.getItem("styleStorage") || "[ ]");
    }
    function writeToLocalStorage(toPersist) {
        localStorage.setItem("styleStorage", JSON.stringify(toPersist));
    }

    return { getAll, persist };// zur verfügung stellen nach aussen

}()); //Idiom: Immediately-invoked Function Expression (IIFE)


