console.log("welcome to notera");
showNotes();
// If user add note add it to local storage
var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) 
{
   var addTxt = document.getElementById("notecontent");
   var addTitle = document.getElementById("notetitle");
   var notes = localStorage.getItem("savedNotes");
   if (notes == null) 
   {
    notesObj = [];
   } 
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
  //shows edit button
  document.getElementById("editBtn").style = "display : list-item";
}
function disableView(){
  //sets value of show box to null
  document.getElementById("notetitle").innerHTML   = "";
  document.getElementById("notecontent").innerHTML = "";
  //remove edit button since its of no use because no note will be displayed when this function runs
  document.getElementById("editBtn").style = "display : none";
  //hide the cross button because no notes is under display
  document.getElementById("disableViewBtn").style = "display : none";
  //shows save button because new note to be added
  document.getElementById("addBtn").style = "display : list-item";
}
