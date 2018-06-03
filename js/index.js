/**
 *
 * Controller
 */
;(function ($, window, document, undefined) {

    "use strict";

    var source = document.getElementById("note-template").innerHTML;
    var template = Handlebars.compile(source);

    $(function () {
        /*test hanlebars*/


        createAllStylesFromStorage();
        createAllNotesFromStorage();

        function createAllNotesFromStorage(){
            let context = notesRepo.getStorage();
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
                changeStyleToSelected();
                console.log(event);
            });

            function changeStyleToSelected(){
                $('.container').removeClass($('.styles-page option').map(function () {
                    return $(this).val();
                }).get().join(' ')).addClass($('.styles-page option:selected').val())
                styleRepo.changeDefaultStyle($('.styles-page option:selected').val());
            }

        }

        function updateView(){
            createAllNotesFromStorage();
        }





        //Eventhandler

        $('.create-new-note').click(function (event) {
            notesRepo.addNote({title: "My New Post", description: "This is my first post!", finishedDate:'2018.06.01',createdDate:'',rating:1})
            updateView()
            //window.location.href = 'note.html'
        });


        if (getUrlParameter('title') && getUrlParameter('datepicker')) {
            console.log(getUrlParameter('title'));
            console.log(getUrlParameter('description'));
            console.log(getUrlParameter('datepicker'));
            createNewNote(getUrlParameter('title'))
        }


    })


    var getUrlParameter = function (sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
})(jQuery, window, document);