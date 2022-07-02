var buttonEl = document.querySelector("#save-task");     // querySelector checks for that id in the .document which is the -> html file
//console.log(buttonEl);                               // El will help to track DOM elements store in variables
var tasksToDoE1 = document.querySelector("#tasks-to-do");

// IT CREATES A LIST AFTER A CLICK 

var createTaskHandler = function(){                        // It has to be declared before the Listener to be able to call it, and also it will replicate the code below 
    var listItemE1 = document.createElement('li');       //create a new task item 
    listItemE1.className = "task-item";               // It will give the same CSS style as this class name so the file is uniform   // style new task item
    listItemE1.textContent = "This is a new task.";  // will create that text inside listItemE1      // add the text 
    tasksToDoE1.appendChild(listItemE1);            // I will add the lisItemE1 at the end of the list          
};

buttonEl.addEventListener("click", createTaskHandler);
