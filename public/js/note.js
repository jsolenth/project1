/**
 *
 * Controller note form
 */

let noteObj = null;
$(function(){




  //Default or localStorage
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
     noteObj = JSON.parse(localStorage.getItem("note"));

     if(noteObj && noteObj.style){
       $('.container').addClass(noteObj.style)
     }


  } else {
      // Sorry! No Web Storage support..
  }


})
function goBack() {
  window.history.back();
}
