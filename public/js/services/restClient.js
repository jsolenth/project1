;(function (services, $) {
    const ajaxUtil = window.util.ajax;

    function createNote(noteObj) {
        return ajaxUtil.ajax("POST", "note.html", noteObj, {});
    }

    function getNotes() {
        return ajaxUtil.ajax("GET", "/getnotes", undefined, {});
    }

    function getNote(id) {
        return ajaxUtil.ajax("GET", `/note/${id}`, undefined, {});
    }

    function updateNote(id, noteObj) {
        return ajaxUtil.ajax("POST", `/note/${id}`, noteObj, {});
    }

    function updateNoteWith(id, noteObjAdd) {
        return ajaxUtil.ajax("POST", `/noteAdding/${id}`, noteObjAdd, {});
    }

    function deleteNote(id) {
        return ajaxUtil.ajax("POST", `/note/${id}`, {delete: true}, {});
    }

    services.restClient = {
        createNote: createNote,
        getNotes: getNotes,
        updateNote: updateNote,
        getNote: getNote,
        deleteNote: deleteNote,
        updateNoteWith: updateNoteWith
    };
}(window.services = window.services || {}, jQuery));