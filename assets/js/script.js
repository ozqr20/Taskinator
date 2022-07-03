var formEl = document.querySelector("#task-form");     // querySelector checks for that id in the .document which is the -> html file
//console.log(buttonEl);                               // El will help to track DOM elements store in variables
var tasksToDoE1 = document.querySelector("#tasks-to-do");

// IT CREATES A LIST AFTER A CLICK 

var createTaskHandler = function(event){                        // It has to be declared before the Listener to be able to call it, and also it will replicate the code below 
    
    event.preventDefault();
    
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value; // It will select the 
 
    var listItemE1 = document.createElement('li');         // create list item
    listItemE1.className = "task-item";               // It will give the same CSS style as this class name so the file is uniform   // style new task item
    
    var taskInfoEl = document.createElement("div"); // create div to hold task info and add to list item
    taskInfoEl.className = "task-info"; // give it a class name
   
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";   // add HTML content to div
    listItemE1.appendChild(taskInfoEl);

   // add entire list item to list
    tasksToDoE1.appendChild(listItemE1);            // I will add the lisItemE1 at the end of the list          
};

formEl.addEventListener("submit", createTaskHandler);
