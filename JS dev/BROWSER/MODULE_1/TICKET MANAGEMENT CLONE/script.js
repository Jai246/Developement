var uid = new ShortUniqueId();
let showAll = document.querySelector(".show_all");
let modal = document.querySelector(".modal");
let input = document.querySelector(".input_container_text");
let mainContainer = document.querySelector(".main-container");
let lockContainer = document.querySelector(".lock_container");
let unlockContainer = document.querySelector(".unlock_container");
let plusContainer = document.querySelector(".plus-container");
let color_Container = document.querySelector(".color_container");
let input_container = document.querySelector(".input_container");
let cross = document.querySelector(".multiply-container");
let colors = ["pink", "blue", "green", "black"];
let modalShow = false;
let deleteMode = false;
let defaultColor = "black";
let cFilter = "";
modal.style.display = "none";


// check if any of the tasks are in local storage 
// bring it to ui

(function () {
    // localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks == null){
        localStorage.setItem("tasks", JSON.stringify([]));
    }
    if(tasks == null) tasks = [];
    for (let i = 0; i < tasks.length; i++) {
        let { id, task, color } = tasks[i];
        createTask(id, task, false, color);
    }
    // get it to ui
    //modal.style.display = "flex";
})();

function hideDispModal(flag){
    if(flag) modal.style.display = "flex";
    else modal.style.display = "none";
}

lockContainer.addEventListener("click", function (e) {
    let numberOFElements = document.querySelectorAll(".task_main-container>div")
    for (let i = 0; i < numberOFElements.length; i++) {
        numberOFElements[i].contentEditable = false;
    }
    // ui match
    lockContainer.classList.add("active");
    unlockContainer.classList.remove("active");
})

unlockContainer.addEventListener("click", function (e) {
    let numberOFElements = document.querySelectorAll(".task_main-container>div")
    for (let i = 0; i < numberOFElements.length; i++) {
        numberOFElements[i].contentEditable = true;
    }
    lockContainer.classList.remove("active");
    unlockContainer.classList.add("active");
})

cross.addEventListener("click" , function(e){
    if(!deleteMode)
    {
        deleteMode = true;
        console.log("onn");

    }
    else{
        deleteMode = false;
    }
})


showAll.addEventListener("click" , function(){
    let allTaskCards = document.querySelectorAll(".task_container");
    for (let i = 0; i < allTaskCards.length; i++) {  
        if(allTaskCards[i]!=modal) allTaskCards[i].style.display = "block";
    }
})

plusContainer.addEventListener("click", function (e) {
    if(modalShow){
        hideDispModal(false);
        modalShow = false;
    }
    else {
        hideDispModal(true);
        modalShow = true;
    }
})

color_Container.addEventListener("click",function(e){
    let element = e.target;
    let color = element.classList[1]
    input.addEventListener("keydown", function (e) {
        if (e.code == "Enter" && input.value) {
            let id = uid();
            createTask(id,input.value,true,color);
            input.value = "";
        }
    })
})


function createTask(id, task,flag,color) 
{
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task_container");
    mainContainer.appendChild(taskContainer);
    //console.log(taskContainer.innerHTML);
    taskContainer.innerHTML = 
    `<div class="task_header ${color}"></div>
            <div class="task_main-container">
                <h3 class="task_id">#${id}</h3>
                <div class="text" contentEditable="true">${task}</div>
            </div>
    `;
    // addEventListener for color changes
    let taskHeader = taskContainer.querySelector(".task_header");
    let inputTask = taskContainer.querySelector(".task_main-container>div");
    // console.log(inputTask);

    modal.style.display = "none";
    modalShow = false;

    taskHeader.addEventListener("click", function () {
        // class -> change 
        // get all the classes on an element
        // console.log(taskHeader.classList);
        let cColor = taskHeader.classList[1];
        let idx = colors.indexOf(cColor);
        let nextIdx = (idx + 1) % 4;
        let nextColor = colors[nextIdx];
        taskHeader.classList.remove(cColor);
        taskHeader.classList.add(nextColor);


        //  id -> localstorage search -> tell -> color update 
        //console.log("parent", taskHeader.parentNode);
        // console.log("taskcontainer", taskHeader.parentNode.children[1]);
        //// MAKING CHANGES IN THE MEMORY AS WELL


        let idElement = taskHeader.parentNode.childNodes[1];
        // console.log(idElement);
        let id = idElement.textContent;
        id = id.split("#")[1];
        let tasksString = localStorage.getItem("tasks");
        let taskArr = JSON.parse(tasksString);
        
        for(let i = 0;i<taskArr.length; i++)
        {
            if(taskArr[i].id == id){
                taskArr[i].color = nextColor;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArr));

    })

        

    taskContainer.addEventListener("click", function (e) {
        if (deleteMode == true) {
            // delete ->ui , storage
            // local storage -> remove;
            taskContainer.remove();
        }
    })


    // when you update the content
    inputTask.addEventListener("blur", function (e) {
        let content = inputTask.textContent;
        let tasksString = localStorage.getItem("tasks");
        let tasksArr = JSON.parse(tasksString)
        // {id: "nDCn8Q", task: "ffdsjbdshf", color: "pink} , {}
        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i].id == id) {
                tasksArr[i].task = content;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    })
    //local storage add 


    if (flag == true) 
    {
        // old task
        let tasksString = localStorage.getItem("tasks");
        let tasksArr = JSON.parse(tasksString) || [];
        let taskObject ={
            id: id,
            task: task,
            color: color
        }
        // 1 new task
        tasksArr.push(taskObject);
        // set 
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    }
}




// filtering 
let colorContainer = document.querySelector(".color-group_container");
let list = document.querySelector(".fa.fa-list");
colorContainer.addEventListener("click", function (e) 
{
    let element = e.target;
    // console.log("e.target",element);
    // console.log(list);
    if (element != colorContainer && element!=list) {
        let filteredCardColor = element.classList[1];
        filterCards(filteredCardColor);
    }
})

function filterCards(filterColor) {
    let allTaskCards = document.querySelectorAll(".task_container");
    console.log(allTaskCards.length);
    if (cFilter != filterColor) 
    {
        for (let i = 0; i < allTaskCards.length; i++) 
        {
            // header color -> 
            let taskHeader = allTaskCards[i].querySelector(".task_header");
            let taskColor = taskHeader.classList[1];
            if (taskColor == filterColor) {
                // show 
                allTaskCards[i].style.display = "block"
            } else {
                // hide 
                allTaskCards[i].style.display = "none"
            }
        }
        cFilter = filterColor;
    } 
    else 
    {
        cFilter = "";
        for (let i = 0; i < allTaskCards.length; i++) 
        {    
            allTaskCards[i].style.display = "flex";    
        }
    }


}