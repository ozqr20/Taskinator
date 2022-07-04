var taskIdCounter = 0;
var tasks = [];  // array to hold tasks for saving 

var formEl = document.querySelector("#task-form");     // querySelector checks for that id in the .document which is the -> html file
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// IT CREATES A LIST AFTER A CLICK 

var taskFormHandler = function(event){                        // It has to be declared before the Listener to be able to call it, and also it will replicate the code below 
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value; 

    if(!taskNameInput || !taskTypeInput) {
        alert("You ned to fill out the task form!")
        return false;
    }
    
      // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;
   
    var isEdit = formEl.hasAttribute("data-task-id");
    
    if(isEdit){                                                 // has data attribute, so get task id and call function to complete edit process
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }else {                                                     // no data attribute, so create object as normal and pass to createTaskEl function
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);  
    };
                          
};

    // Create Task Function 

var createTaskEl = function(taskDataObj){

    var listItemEl = document.createElement('li');      
    listItemEl.className = "task-item";               // It will give the same CSS style as this class name so the file is uniform   // style new task item
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div"); // create div to hold task info and add to list item
    taskInfoEl.className = "task-info"; 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // add HTML content to div
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    
    switch (taskDataObj.status) {
        case "to do":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
          tasksToDoEl.append(listItemEl);
          break;
        case "in progress":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
          tasksInProgressEl.append(listItemEl);
          break;
        case "completed":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
          tasksCompletedEl.append(listItemEl);
          break;
        default:
          console.log("Something went wrong!");
      }
    
    taskDataObj.id = taskIdCounter;    // save task as an object with name, type, status, and id properties then push it into tasks array
    tasks.push(taskDataObj);
    saveTasks();         // save tasks to localStorage
    taskIdCounter++;     // increase task counter for next unique task id

};

    // Create TaskAction Function

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div"); // It creates container to hold elements
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
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusOptionEl.textContent = statusChoices[i];
       
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }

    return actionContainerEl;
    
};

var taskButtonHandler = function(event){

    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
      } else if (targetEl.matches(".delete-btn")) {
        console.log("delete", targetEl);
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
      }
};

var deleteTask = function(taskId){
    console.log(taskId);
    
    // find task list element with taskId value and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    var updatedTaskArr = []; // create new array to hold updated list of tasks

    for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        };
    };
    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
};

var editTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    // write values of taskName and taskType to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // set data attribute to the form with a value of the task's id so it knows which one is being edited
    document.querySelector("#save-task").textContent = "Save Task";
    // update form's button to reflect editing a task rather than creating a new one

    formEl.setAttribute("data-task-id", taskId);
    
};

var completeEditTask = function(taskName,taskType,taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");    // find the matching task list item

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    
    // loop through tasks array and task object with new content
    for(var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          tasks[i].name = taskName;
          tasks[i].type = taskType;
        };
    };
    alert("Task Updated!");
    // to reset the form 

    formEl.removeAttribute("data-task-id");    // remove data attribute from form
    document.querySelector("#save-task").textContent = "Add Task";    // update formEl button to go back to saying "Add Task" instead of "Edit Task"
    saveTasks();
};

var taskStatusChangeHandler = function(event) {
    console.log(event.target.value);
  // find task list item based on event.target's data-task-id attribute
  var taskId = event.target.getAttribute("data-task-id");

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

   // get the currently selected option's value and convert to lowercase
   var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
    // update task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    };
  };
  console.log(tasks);
  saveTasks();
};

var saveTasks = function(){

    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(localStorage);

};

var loadTasks = function(){
    var savedTasks = localStorage.getItem("tasks");
    console.log(saveTasks);
    if(!savedTasks){
        return false;
    };
    console.log("Saved tasks here!");
    // else, load up saved tasks

    savedTasks = JSON.parse(savedTasks);
    
    for (var i = 0; i < savedTasks.length; i++) {
        // pass each task object into the `createTaskEl()` function
        createTaskEl(savedTasks[i]);
    };
};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);
// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks();
