console.log("welcome to notera");
showNotes();

// If user add note add it to local storage
var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  var addTxt = document.getElementById("notecontent");
  var addTitle = document.getElementById("notetitle");
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  // object for title and text and Date
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  //pushing input to local storage
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  //remove previous note inputs
  addTxt.value = "";
  addTitle.value = "";

  console.log(notesObj);
  //input will reflect to note list
  showNotes();
});
// function to show elements from local storage
function showNotes() {
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  
  var html = "";
  notesObj.forEach(function (element, index) {
    html += `
          <div class="notelistitem border">
          <div class="d-flex">
          <button class="my-1 btn btn-outline-dark deleteBtn " type="submit" id="${index}" onclick="deleteNote(this.id)">
            <i class="fas fa-trash"></i>
          </button>
          <div class="mx-2">
          <div class="notelisttitle" id="title${index}">${element.title}</div>
          <div class="notelisttext">${element.text} </div>
          </div>
          </div>
          </div>
          `;
    var notesElm = document.getElementById("notes");
    if (notes.length != 0) {
      notesElm.innerHTML = html;
    }
  });

}
//function to delete notes
function deleteNote(index) {
  // console.log(' i am deleting ',index);
  var notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let notelistitems = document.getElementsByClassName("notelistitem");
  Array.from(notelistitems).forEach(function (element) {
    let cardTxt = element.getElementsByClassName("notelisttext")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});


