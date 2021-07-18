// search box function
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  let notelistitems = document.getElementsByClassName("notelistitem");
  Array.from(notelistitems).forEach(function (element) {
    let cardTxt = element.getElementsByClassName("notelisttext")[0].innerText;
    let cardTitle = element.getElementsByClassName("notelisttitle")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else if(cardTitle.includes(inputVal)){
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  });
});


//when click on any note in list then this function runs
function grabNotes(index) {
  parent = document.getElementById("note" + index)
  childrenTitle = parent.children[0];
  childrenText = parent.children[1];
  document.getElementById("disableViewBtn").classList.remove("disabled");
  $("#notetitle").html(childrenTitle.innerHTML);
  $("#notecontent").html(childrenText.innerHTML);
  $("#disableViewBtn").css("display", "list-item");
  $("#addBtn").css("display", "none");
  $("#notetitle").prop("disabled", "true");
  $("#notecontent").prop("disabled", "true");
}


//when we click cross button this runs
function disableView() {
  $("#notetitle").html("");
  $("#notecontent").html("");
  $("#disableViewBtn").css("display", "none");
  $("#addBtn").css("display", "list-item");
  $("#notetitle").removeAttr("disabled");
  $("#notecontent").removeAttr("disabled");
}


// deleting any note
function deleteNote(b) {
  if (firebase.auth().currentUser !== null) {
    var t = firebase.auth().currentUser.email;
    db.collection(t).doc(b).delete().then(() => {
      var l = "notecard" + b;
      document.getElementById(l).style.display = "none";
    }).catch(error => {   
      alert(error.message);
   });
  }
}


// editing note 
function editNote(index) {
  console.log(index)
  parent = document.getElementById("note" + index)
  childrenTitle = parent.children[0];
  childrenText = parent.children[1];
  document.getElementById("disableViewBtn").classList.remove("disabled");
  $("#notetitle").html(childrenTitle.innerHTML);
  $("#notecontent").html(childrenText.innerHTML);
  $("#notetitle").removeAttr("disabled");
  $("#notecontent").removeAttr("disabled");
  deleteNote(index);
}


//modal toggle functions
function toggleResetPswd(e) {
  e.preventDefault();
  $('#logreg-forms .form-signin').toggle() // display:block or none
  $('#logreg-forms .form-reset').toggle() // display:block or none
}
function toggleSignUp(e) {
  e.preventDefault();
  $('#logreg-forms .form-signin').toggle(); // display:block or none
  $('#logreg-forms .form-signup').toggle(); // display:block or none
}
$(() => {
  // Login Register Form
  $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
  $('#logreg-forms #cancel_reset').click(toggleResetPswd);
  $('#logreg-forms #btn-signup').click(toggleSignUp);
  $('#logreg-forms #cancel_signup').click(toggleSignUp);
})