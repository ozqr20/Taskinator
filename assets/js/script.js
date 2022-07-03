var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");     // querySelector checks for that id in the .document which is the -> html file
var tasksToDoEl = document.querySelector("#tasks-to-do");


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

    createTaskEl(taskDataObj); // send it as an argument to createTaskEl
};

    // Create Task Function 

var createTaskEl = function(taskDataObj){

    var listItemEl = document.createElement('li');       //create a list item
    listItemEl.className = "task-item";               // It will give the same CSS style as this class name so the file is uniform   // style new task item
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div"); // create div to hold task info and add to list item
    taskInfoEl.className = "task-info"; // give it a class name
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // add HTML content to div
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);            // I will add the lisItemEl at the end of the list    
    console.log(tasksToDoEl);
    taskIdCounter++;
};

    // Create TaskAction Function

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create edit button

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.append(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // dropdown button
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }

    return actionContainerEl;
    
};

formEl.addEventListener("submit", taskFormHandler);
