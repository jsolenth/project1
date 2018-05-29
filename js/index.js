let noteObj = null;
$(function(){
  //Eventhandler
  $('.styles-page').change(function(event){
    $('.container').removeClass($('.styles-page option').map(function(){return $(this).val();}).get().join(' ')).addClass($('.styles-page option:selected').val())
    noteObj.style = $('.styles-page option:selected').val()
    localStorage.setItem('note',JSON.stringify(noteObj));
    console.log(event);
  });

  $('.create-new-note').click(function(event){
    window.location.href = 'note.html'
  });








  //Default or localStorage
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
     noteObj = JSON.parse(localStorage.getItem("note"));

     if(noteObj && noteObj.style){
       $('.styles-page').val(noteObj.style).change()
     }else {
       noteObj = {style:$('.styles-page option:selected').val()}
     }
     $('.container').addClass($('.styles-page option:selected').val())

  } else {
      // Sorry! No Web Storage support..
  }


  if(getUrlParameter('title') && getUrlParameter('datepicker')){
    console.log(getUrlParameter('title'));
    console.log(getUrlParameter('description'));
    console.log(getUrlParameter('datepicker'));
    createNewNote(getUrlParameter('title'))
  }




})
var createNewNote = function(title, desc, finDate, creDate, rating){
  if(!noteObj.notesArr){
    noteObj.notesArr = []
  }
  noteObj.notesArr.push({
    title:title,
    description:desc,
    finishedDate:finDate,
    createdDate:creDate,
    rating:rating
  })
  localStorage.setItem('note',JSON.stringify(noteObj));
}
var getUrlParameter = function(sParam) {
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
