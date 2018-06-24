/**
 *
 * Controller
 */
;(function ($, window, document, undefined) {
    "use strict";
    const client = window.services.restClient;

    $(function () {
        const inputDate = $("#datepicker");
        const btnRating = $('.rating span');
        const btnCancel = $('.cancel');
        const btnNewNote = $('form.create_new_note');

        $('.container').removeClass(styleRepo.getAllStyleValues().join(' ')).addClass(styleRepo.getDefault().value);



        inputDate.datepicker({
            dateFormat: "yy-mm-dd",
            defaultDate: 0
        });
        inputDate.val(moment().format('YYYY-MM-DD'));


        btnRating.on('click', function () {
            btnRating.removeClass('rate');

            if ($(this).index() == 0) {
                btnRating.addClass('rate');
            } else {
                $(".rating span:gt( " + ($(this).index() - 1) + ")").addClass('rate');
            }
        })

        if (sessionStorage.getItem('update-note')) {
            //TODO: update Note maybe check in other way
            //let note = notesRepo.getNoteById(sessionStorage.getItem('update-note'));
            client.getNote(sessionStorage.getItem('update-note')).done(function (note) {
                console.log(note);
                $('#title-note').val(note.title);
                $('#description-note').val(note.description);
                $('#datepicker').val(note.finishedDate);
                $('.rating span:eq(' + Math.abs(note.rating - 5) + ')').click();
                //$('#rating').val()
            }).fail(function( msg ) {
                //nothing!
            });

        }

        btnCancel.on('click', function (event) {
            window.history.back();
        });

        btnNewNote.on('submit', function (event) {
            event.preventDefault();
            if (sessionStorage.getItem('update-note')) {

                //update Note
                let noteId = sessionStorage.getItem('update-note');
                client.updateNote(noteId, {
                    title: $('#title-note').val(),
                    description: $('#description-note').val(),
                    finishedDate: $('#datepicker').val(),
                    createdDate: moment().format(),
                    rating: $( ".rating span.rate" ).length
                }).done(function (msg) {
                    window.location.href = 'index.html';
                }).fail(function( msg ) {
                    console.log(msg);
                    //nothing!
                });

                sessionStorage.removeItem('update-note');
            } else {
                //new Note
                client.createNote({
                    title: $('#title-note').val(),
                    description: $('#description-note').val(),
                    finishedDate: $('#datepicker').val(),
                    createdDate: moment().format(),
                    rating: $( ".rating span.rate" ).length
                }).done(function (msg) {
                    window.location.href = 'index.html';
                }).fail(function( msg ) {
                    //nothing!
                });
                //inputPizza.val("");
                event.preventDefault();
            }


        });

    })

})(jQuery, window, document);