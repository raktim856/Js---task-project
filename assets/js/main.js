// Define All Elements
let taskForm = document.querySelector('#taskForm');
let taskName = document.querySelector('#taskName');
let filterTask = document.querySelector('#filterTask');
let taskList = document.querySelector('#taskList');
let clear_allTask = document.querySelector('#clear_allTask');
// Define EventListener
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clear_allTask.addEventListener('click', clearAll);
filterTask.addEventListener('keyup', findTask);
// Localstorage
document.addEventListener('DOMContentLoaded', gettask);

// -----------Define Functions-----------
// Create addTask function
function addTask(event){
    if(taskName.value === ""){
        window.alert("Please Enter Your Value");
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskName.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        let icon = document.createElement('i');
        icon.classList = "fa fa-times";
        link.appendChild(icon);
        li.appendChild(link);
        taskList.appendChild(li);
        storeinLocastorage(taskName.value);
        taskName.value = "";
    }
    event.preventDefault();
}
// Create removeTask Function
function removeTask(e){
    if(e.target.parentElement.hasAttribute('href')){
        if(confirm('Are you sure?')){
            let ele = e.target.parentElement.parentElement;
            ele.remove();
            removeTasklocalstorage(ele);
        }
    }
}
// Create clearAll Function
function clearAll(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}
// Create findTask Function
function findTask(e){
    let filterText = e.target.value.toLowerCase();
    let selAll = document.querySelectorAll('li');
    selAll.forEach(item => {
        let taskCont = item.textContent;
        let cont = taskCont.toLowerCase();
        if(cont.indexOf(filterText) == -1){
            item.style.display = 'none';
        }else{
            item.style.display = 'block';
        }
    });
}
// Store in Localstorage
function storeinLocastorage(work){
    let item;
    if(localStorage.getItem('task') === null){
        item = [];
    }else{
        item = JSON.parse(localStorage.getItem('task'));
    }
    item.push(work);
    localStorage.setItem('task', JSON.stringify(item));
}
// Get data from Localstorage
function gettask(){
    let item;
    if(localStorage.getItem('task') === null){
        item = [];
    }else{
        item = JSON.parse(localStorage.getItem('task'));
    }
    item.forEach(items => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(items + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        let icon = document.createElement('i');
        icon.classList = "fa fa-times";
        link.appendChild(icon);
        li.appendChild(link);
        taskList.appendChild(li);
    });
}
// remove task from Locatstorage
function removeTasklocalstorage(work){
    let item;
    if(localStorage.getItem('task') === null){
        item = [];
    }else{
        item = JSON.parse(localStorage.getItem('task'));
    }
    let li = work;
    li.removeChild(li.lastChild);
    item.forEach((value, index) => {
        if(li.textContent.trim() === value){
            item.splice(index, 1);
        }
    });
    localStorage.setItem('task', JSON.stringify(item));
}