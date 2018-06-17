/**
 *
 * Controller
 */
;(function ($, window, document, undefined) {

    "use strict";
    if (document.getElementById("note-template")) {
        // View Constants
        const greetTexts = {
            "true": "checked",
            "false": ""

        };

        // View Template Setup (Handlebars)
        Handlebars.registerHelper("greetText", function (type) {
            return greetTexts[type];
        });

        // View Template Setup (Handlebars)
        Handlebars.registerHelper("ratingsym", function (lengthRating) {
            let text = ''
            for (let i = 0; i < lengthRating; ++i) {
                text += '<span>&#9760;</span>'
            }
            return text;
        });

        var source = document.getElementById("note-template").innerHTML;
        var template = Handlebars.compile(source);

    }


    $(function () {
        if($( "#datepicker" ).length > 0){
            let currentDate = moment().format('YYYY-MM-DD');
            $( "#datepicker" ).datepicker({
                dateFormat: currentDate,
                defaultDate: 0
            });
            $( "#datepicker" ).val(currentDate);
        }


        $('.rating span').on('click', function () {
            $('.rating span').removeClass('rate');

            if($(this).index() == 0){
                $( ".rating span" ).addClass('rate');
            }else{
                $( ".rating span:gt( "+($(this).index()-1)+")" ).addClass('rate');
            }
        })

        createAllStylesFromStorage();
        if (template) {
            createAllNotesFromStorage();
        }
        if (sessionStorage.getItem('update-note')) {
            //TODO: update Note maybe check in other way
            let note = notesRepo.getNoteById(sessionStorage.getItem('update-note'));
            console.log(note);
            $('#title-note').val(note.title);
            $('#description-note').val(note.description);
            $('#datepicker').val(note.finishedDate);
            $('.rating span:eq('+Math.abs(note.rating-5)+')').click();
            //$('#rating').val()
        }


        function createAllNotesFromStorage(sorting, reverse, filter) {
            let context = notesRepo.getStorage(sorting, reverse, filter);
            let html = '';
            for (let i = 0; i < context.length; ++i) {
                html += template(context[i]);
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

        $('.create-new-note').on('click', function (event) {
            //notesRepo.addNote({title: "My New Post", description: "This is my first post!", finishedDate:'2018.06.01',createdDate:'',rating:1})
            //updateView()
            window.location.href = 'note.html'
        });

        $('.cancel').on('click', function (event) {
            window.history.back();
        });

        $('.sort-options button').on('click', function () {
            $('.sort-options button').not($(this)).removeClass('active').removeClass('active2')
            if (!$(this).hasClass('active') && !$(this).hasClass('active2')) {
                $(this).addClass('active');
                createAllNotesFromStorage(event.target.value, true, $('button.filter-options').hasClass('active'));
            } else {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active').addClass('active2');

                    console.log('active2')
                    createAllNotesFromStorage(event.target.value, false, $('button.filter-options').hasClass('active'));

                } else if ($(this).hasClass('active2')) {
                    //   $(this).removeClass('active2');
                    //}else{
                    $(this).addClass('active').removeClass('active2');
                    createAllNotesFromStorage(event.target.value, true, $('button.filter-options').hasClass('active'));
                }
            }
        })

        $('button.filter-options').on('click', function () {
                console.log('filter-option')
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    createAllNotesFromStorage(false, false, false);
                } else {
                    $(this).addClass('active');
                    createAllNotesFromStorage(false, false, true);
                }
        })

        $('form.create_new_note').on('submit', function (event) {
            event.preventDefault();
            if (sessionStorage.getItem('update-note')) {
                //update Note
                let noteId = sessionStorage.getItem('update-note');
                let note = notesRepo.getNoteById(noteId);
                notesRepo.updateNotes(note, {
                    title: $('#title-note').val(),
                    description: $('#description-note').val(),
                    finishedDate: $('#datepicker').val(),
                    createdDate: moment().format(),
                    rating: $( ".rating span.rate" ).length
                })
                sessionStorage.removeItem('update-note');
            } else {
                //new Note
                notesRepo.addNote({
                    title: $('#title-note').val(),
                    description: $('#description-note').val(),
                    finishedDate: $('#datepicker').val(),
                    createdDate: moment().format(),
                    rating: $( ".rating span.rate" ).length
                })
            }

            window.location.href = 'index.html';

        });

        $('.main').on('click', '.note button[name="edit"]', function () {
            let noteId = event.target.value;
            sessionStorage.setItem('update-note', noteId);
            window.location.href = 'note.html'
        })

        $('.main').on('click', '.note button[name="delete"]', function () {
            let noteId = event.target.value;
            let note = notesRepo.getNoteById(noteId);
            //sessionStorage.setItem('update-note', noteId);
            notesRepo.removeNote(note);
            updateView();
        })


        $('.main').on('click', '.note input', function () {
            let noteId = event.target.value;
            let checked = event.target.checked;
            let note = notesRepo.getNoteById(noteId);
            notesRepo.updateNotesFinished(note, checked)
            console.log('donecheckbox btn')
        })
    })

})(jQuery, window, document);