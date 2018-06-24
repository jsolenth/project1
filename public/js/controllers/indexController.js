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



        createAllStylesFromStorage();

        renderNotes();


        function renderNotes( orderStr, reverse,  filterStr)
        {
            client.getNotes().done(function(notes){
                //createAllNotesFromStorage

                notes = sortFilter(notes, orderStr, reverse,  filterStr)
                if(notes.length){
                    let html = '';
                    for (let i = 0; i < notes.length; ++i) {
                        html += notesRenderer(notes[i]);
                    }
                    mainDiv.html(html);

                }

            })

            function sortFilter(notesArr, orderStr, reverse,  filterStr) {
                if(orderStr){
                        return notesArr.filterByProb(filterStr).sortByProb(orderStr, reverse);
                    }else {
                        return notesArr.filterByProb(filterStr);
                    }
            }
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



            styleSelect.change(function (event) {
                changeStyleToSelected($('.styles-page option:selected').val());
                console.log(event);
            });
            changeStyleToSelected(styleSelect.val());

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


        //Eventhandler

        btnNewNote.on('click', function (event) {
            window.location.href = 'note.html'
        });



        btnSort.on('click', function () {
            btnSort.not($(this)).removeClass('active').removeClass('active2')
            if (!$(this).hasClass('active') && !$(this).hasClass('active2')) {
                $(this).addClass('active');
                renderNotes(event.target.value, true, btnFilter.hasClass('active'));
            } else {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active').addClass('active2');

                    console.log('active2')
                    renderNotes(event.target.value, false, btnFilter.hasClass('active'));

                } else if ($(this).hasClass('active2')) {
                    //   $(this).removeClass('active2');
                    //}else{
                    $(this).addClass('active').removeClass('active2');
                    renderNotes(event.target.value, true, btnFilter.hasClass('active'));
                }
            }
        })

        btnFilter.on('click', function () {
                console.log('filter-option')
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    renderNotes(false, false, false);
                } else {
                    $(this).addClass('active');
                    renderNotes(false, false, true);
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
        })


        mainDiv.on('click', '.note input', function () {
            //done
            let noteId = event.target.value;
            let checked = event.target.checked;
            client.updateNoteWith(noteId, {
                finished:checked
            }).done(function (msg) {
                renderNotes();
            }).fail(function( msg ) {
                console.log(msg);
                //nothing!
            });

        })
    })

})(jQuery, window, document);