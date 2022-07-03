var formEl = document.querySelector("#task-form");     // querySelector checks for that id in the .document which is the -> html file
var tasksToDoE1 = document.querySelector("#tasks-to-do");

// IT CREATES A LIST AFTER A CLICK 

var taskFormHandler = function(event){                        // It has to be declared before the Listener to be able to call it, and also it will replicate the code below 
    
    event.preventDefault();
    
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value; 

    if(!taskNameInput || !taskTypeInput) {
        alert("You ned to fill out the task form!")
        return false;
    }
    formEl.reset();
    // package up data as an object

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskE1(taskDataObj); // send it as an argument to createTaskE1
};

    var createTaskE1 = function(taskDataObj){

    // create list item
    var listItemE1 = document.createElement('li');       //create a new task item 
    listItemE1.className = "task-item";               // It will give the same CSS style as this class name so the file is uniform   // style new task item
    
    var taskInfoEl = document.createElement("div"); // create div to hold task info and add to list item
    taskInfoEl.className = "task-info"; // give it a class name
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // add HTML content to div
    
    listItemE1.appendChild(taskInfoEl);
    tasksToDoE1.appendChild(listItemE1);            // I will add the lisItemE1 at the end of the list          
};

formEl.addEventListener("submit", taskFormHandler);
