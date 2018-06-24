/**
 *
 * Controller
 */
;(function ($, window, document, undefined) {
    "use strict";
    const client = window.services.restClient;

    $(function () {
        const btnNewNote = $('.create-new-note');
        const btnSort = $('.sort-options button');
        const btnFilter = $('button.filter-options');
        const mainDiv = $('.main');

        const notesRenderer = Handlebars.compile($("#note-template").html());



        //createAllStylesFromStorage();
        //if (notesRenderer) {
            //createAllNotesFromStorage();
            renderNotes();
        //}


        function renderNotes()
        {
            client.getNotes().done(function(notes){
                //createAllNotesFromStorage
                if(notes.length){
                    let html = '';
                    for (let i = 0; i < notes.length; ++i) {
                        html += notesRenderer(notes[i]);
                    }
                    mainDiv.html(html);

                }

            })
        }


        function createAllNotesFromStorage(sorting, reverse, filter) {
            let context = notesRepo.getStorage(sorting, reverse, filter);
            let html = '';
            for (let i = 0; i < context.length; ++i) {
                html += notesRenderer(context[i]);
            }
            $('.main').html(html);
        }

        function createAllStylesFromStorage() {
            let styleSelect = $('.styles-page');

            let options = styleRepo.getStorage();

            for (let i = 0; i < options.length; ++i) {
                styleSelect.append($("<option>", {
                    value: options[i].value,
                    text: options[i].name,
                    selected: options[i].default
                }));
            }
            changeStyleToSelected();


            styleSelect.change(function (event) {
                changeStyleToSelected($('.styles-page option:selected').val());
                console.log(event);
            });

            function changeStyleToSelected($newStyleVal) {


                // $('.container').removeClass($('.styles-page option').map(function () {
                //     return $(this).val();
                // }).get().join(' ')).addClass($('.styles-page option:selected').val())

                if ($newStyleVal) {
                    $('.container').removeClass(styleRepo.getAllStyleValues().join(' ')).addClass($newStyleVal)
                    styleRepo.changeDefaultStyle($newStyleVal);
                } else {
                    $('.container').removeClass(styleRepo.getAllStyleValues().join(' ')).addClass(styleRepo.getDefault().value)
                }


            }

        }


        function updateView() {
            createAllNotesFromStorage();
        }


        //Eventhandler

        btnNewNote.on('click', function (event) {
            //notesRepo.addNote({title: "My New Post", description: "This is my first post!", finishedDate:'2018.06.01',createdDate:'',rating:1})
            //updateView()
            window.location.href = 'note.html'
        });



        btnSort.on('click', function () {
            btnSort.not($(this)).removeClass('active').removeClass('active2')
            if (!$(this).hasClass('active') && !$(this).hasClass('active2')) {
                $(this).addClass('active');
                createAllNotesFromStorage(event.target.value, true, btnFilter.hasClass('active'));
            } else {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active').addClass('active2');

                    console.log('active2')
                    createAllNotesFromStorage(event.target.value, false, btnFilter.hasClass('active'));

                } else if ($(this).hasClass('active2')) {
                    //   $(this).removeClass('active2');
                    //}else{
                    $(this).addClass('active').removeClass('active2');
                    createAllNotesFromStorage(event.target.value, true, btnFilter.hasClass('active'));
                }
            }
        })

        btnFilter.on('click', function () {
                console.log('filter-option')
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    createAllNotesFromStorage(false, false, false);
                } else {
                    $(this).addClass('active');
                    createAllNotesFromStorage(false, false, true);
                }
        })



        mainDiv.on('click', '.note button[name="edit"]', function () {
            let noteId = event.target.value;
            sessionStorage.setItem('update-note', noteId);
            window.location.href = 'note.html';
        })

        mainDiv.on('click', '.note button[name="delete"]', function () {
            let noteId = event.target.value;
            client.deleteNote(noteId).done(function (msg) {
                //window.location.href = 'index.html';
                renderNotes();
            }).fail(function( msg ) {
                console.log(msg);
                //nothing!
            });


            // let note = notesRepo.getNoteById(noteId);
            // //sessionStorage.setItem('update-note', noteId);
            // notesRepo.removeNote(note);
            // updateView();
        })


        mainDiv.on('click', '.note input', function () {
            let noteId = event.target.value;
            let checked = event.target.checked;
            let note = notesRepo.getNoteById(noteId);
            notesRepo.updateNotesFinished(note, checked);
            console.log('donecheckbox btn');
        })
    })

})(jQuery, window, document);