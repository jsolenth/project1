/**
 *
 * Controller
 */
;(function ($, window, document, undefined) {

    "use strict";
    if(document.getElementById("note-template")){
        var source = document.getElementById("note-template").innerHTML;
        var template = Handlebars.compile(source);
    }


    $(function () {
        /*test hanlebars*/


        createAllStylesFromStorage();
        if(template){
            createAllNotesFromStorage();
        }
        if(sessionStorage.getItem('update-note')) {
            //TODO: update Note maybe check in other way
            let note = notesRepo.getNoteById(sessionStorage.getItem('update-note'));
            console.log(note);
            $('#title-note').val(note.title);
            $('#description-note').val(note.description);
            $('#datepicker').val(note.finishedDate);
            $('#rating').val(note.rating)
        }


        function createAllNotesFromStorage(sorting){
            let context = notesRepo.getStorage(sorting);
            let html =  '';
            for (let i = 0; i < context.length; ++i) {
                html += template(context[i]);
            }
            $('.main').html(html);
        }

        function createAllStylesFromStorage(){
            let styleSelect =  $('.styles-page');

            let options = styleRepo.getStorage();

            for (let i = 0; i < options.length; ++i) {
                styleSelect.append($("<option>", {value: options[i].value, text: options[i].name, selected: options[i].default}));
            }
            changeStyleToSelected();


            styleSelect.change(function (event) {
                changeStyleToSelected($('.styles-page option:selected').val());
                console.log(event);
            });

            function changeStyleToSelected($newStyleVal){


                // $('.container').removeClass($('.styles-page option').map(function () {
                //     return $(this).val();
                // }).get().join(' ')).addClass($('.styles-page option:selected').val())

                if($newStyleVal){
                    $('.container').removeClass(styleRepo.getAllStyleValues().join(' ')).addClass($newStyleVal)
                    styleRepo.changeDefaultStyle($newStyleVal);
                }else{
                    $('.container').removeClass(styleRepo.getAllStyleValues().join(' ')).addClass(styleRepo.getDefault().value)
                }


            }

        }

        function updateView(){
            createAllNotesFromStorage();
        }





        //Eventhandler

        $('.create-new-note').on('click', function (event) {
            //notesRepo.addNote({title: "My New Post", description: "This is my first post!", finishedDate:'2018.06.01',createdDate:'',rating:1})
            //updateView()
            window.location.href = 'note.html'
        });

        $('.cancel').on('click',function (event) {
            window.history.back();
        });

        $('.sort-options button').on('click', function(){
            createAllNotesFromStorage(event.target.value);
        })

        $('form.create_new_note').on('submit',function (event) {
            event.preventDefault();
            if(sessionStorage.getItem('update-note')){
                //update Note
                let noteId = sessionStorage.getItem('update-note');
                let note = notesRepo.getNoteById(noteId);
                notesRepo.updateNotes(note, {title: $('#title-note').val(), description: $('#description-note').val(), finishedDate:$('#datepicker').val(),createdDate:moment().format(),rating:$('#rating').val()})
                sessionStorage.removeItem('update-note');
            }else{
                //new Note
                notesRepo.addNote({title: $('#title-note').val(), description: $('#description-note').val(), finishedDate:$('#datepicker').val(),createdDate:moment().format(),rating:$('#rating').val()})
            }

            window.location.href = 'index.html'
        });

        $('.main .note button').on('click', function(){
            let noteId = event.target.value;
            sessionStorage.setItem('update-note', noteId);
            window.location.href = 'note.html'
            console.log('edit btn')
        })


    })

})(jQuery, window, document);