console.log("welcome to notera");
showNotes();
// If user add note add it to local storage
var addBtn = document.getElementById("addBtn");
// when user clicks save button
addBtn.addEventListener("click", function (e) 
{
  //takes content out of text area and store them in variable
   var addTxt = document.getElementById("notecontent");
   var addTitle = document.getElementById("notetitle");
   var notes = localStorage.getItem("savedNotes");
   //makes a array of objects if notes are zero
   if (notes == null) 
   {
    notesObj = [];
   } 
   // if notes are not zero 
   else 
   {
    notesObj = JSON.parse(notes);
   }
   let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  //pushing input to local storage
  notesObj.push(myObj);
  localStorage.setItem("savedNotes", JSON.stringify(notesObj));
  //remove previous note inputs
  addTxt.value = "";
  addTitle.value = "";
  console.log(notesObj);
  window.location.reload();
  //input will reflect to note list
  showNotes();
});
// function to show elements from local storage
function showNotes() 
{
  var notes = localStorage.getItem("savedNotes");
  if (notes == null) 
  {
    notesObj = [];
  } 
  else 
  {
    notesObj = JSON.parse(notes);
  }
  var html = "";
  notesObj.forEach(function (element, index) 
  {
    html += `
          <div class="notelistitem border">
          <div class="d-flex">
          <button class="my-1 btn btn-default deleteBtn " type="submit" id="${index}" onclick="deleteNote(this.id)">
            <i class="fas fa-trash"></i>
          </button>
          <div id="note${index}" class="noteCardWritten" onclick="grabNotes(this.id.substr(id.length - 1))">
          <div class="notelisttitle" id="title${index}">${element.title}</div>
          <div class="notelisttext" id="text${index}">${element.text} </div>
          </div>
          <button class="my-1 btn btn-default deleteBtn " type="submit" id="e${index}" onclick="editNote(this.id.substr(id.length - 1))">
            <i class="fas fa-edit"></i>
          </button>
          </div>
          </div>
          `;
    var notesElm = document.getElementById("notes");
    if (notes.length != 0)
    {
      notesElm.innerHTML = html;
    }else{
      showNotes();
    }
  });
}
//function to delete notes
function deleteNote(index) 
{
  var notes = localStorage.getItem("savedNotes");
  if (notes == null) 
  {
    notesObj = [];
  } 
  else 
  {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("savedNotes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () 
{
  let inputVal = search.value.toLowerCase();
  let notelistitems = document.getElementsByClassName("notelistitem");
  Array.from(notelistitems).forEach(function (element) 
  {
    let cardTxt = element.getElementsByClassName("notelisttext")[0].innerText;
    if (cardTxt.includes(inputVal)) 
    {
      element.style.display = "block";
    } 
    else 
    {
      element.style.display = "none";
    }
  });
});
//when click on any note in list then this function runs
function grabNotes(index){
  parent = document.getElementById("note" + index)
  childrenTitle =  parent.children[0];
  childrenText = parent.children[1];
  document.getElementById("disableViewBtn").classList.remove("disabled");
  // console.log(` text${index} is title `+ childrenTitle.innerHTML);
  // console.log(` text${index} is text `+ childrenText.innerHTML);
  // add title to show box 
  document.getElementById("notetitle").innerHTML   = childrenTitle.innerHTML;
  // add text to show box
  document.getElementById("notecontent").innerHTML = childrenText.innerHTML;
  //show button to remove displaying current note
  document.getElementById("disableViewBtn").style = "display : list-item";
  //removes save note button because the note can only be edited
  document.getElementById("addBtn").style = "display : none";
  document.getElementById("notetitle").disabled = "true";
  document.getElementById("notecontent").disabled = "true";
}
//when we click cross button this runs
function disableView(){
  //sets value of show box to null
  document.getElementById("notetitle").innerHTML   = "";
  document.getElementById("notecontent").innerHTML = "";
  //hide the cross button because no notes is under display
  document.getElementById("disableViewBtn").style = "display : none";
  //shows save button because new note to be added
  document.getElementById("addBtn").style = "display : list-item";
  document.getElementById("notetitle").disabled = "false";
  document.getElementById("notecontent").disabled = "false";
  window.location.reload();
}
function editNote(index){
  console.log(index);
  //grabbing notes
  parent = document.getElementById("note" + index)
  childrenTitle =  parent.children[0];
  childrenText = parent.children[1];
  document.getElementById("disableViewBtn").classList.remove("disabled");
  // console.log(` text${index} is title `+ childrenTitle.innerHTML);
  // console.log(` text${index} is text `+ childrenText.innerHTML);
  // add title to show box 
  document.getElementById("notetitle").innerHTML   = childrenTitle.innerHTML;
  // add text to show box
  document.getElementById("notecontent").innerHTML = childrenText.innerHTML;
  deleteNote(index);
}