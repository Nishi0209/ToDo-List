const taskInput=document.getElementById("taskInput"),
addBtn=document.getElementById("addBtn"),
taskList=document.getElementById("taskList"),
emptyMessage=document.getElementById("emptyMessage"),
taskCount=document.getElementById("taskCount");
let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
displayTasks();
addBtn.addEventListener("click",addTask);
taskInput.addEventListener("keydown",e=>e.key==="Enter"&&addTask());
function addTask(){
    const taskText=taskInput.value.trim();
    if(!taskText) return alert("Please enter a task.");
    if(tasks.some(task=>task.text.toLowerCase()===taskText.toLowerCase()))
        return alert("Task already exists.");
    tasks.push({text:taskText,completed:false});
    saveTasks();
    displayTasks();
    taskInput.value="";
    taskInput.focus();
}
function displayTasks(){
    taskList.innerHTML="";
    taskCount.textContent=`Total Tasks: ${tasks.length}`;
    emptyMessage.style.display=tasks.length?"none":"block";
    tasks.forEach((task,index)=>{
        const li=document.createElement("li"),
        span=document.createElement("span"),
        deleteBtn=document.createElement("button");
        span.textContent=task.text;
        if(task.completed) span.classList.add("completed");
        span.onclick=()=>{
            tasks[index].completed=!tasks[index].completed;
            saveTasks();
            displayTasks();
        };
        deleteBtn.textContent="Delete";
        deleteBtn.className="delete-btn";
        deleteBtn.onclick=()=>{
            if(confirm("Are you sure you want to delete this task?")){
                tasks.splice(index,1);
                saveTasks();
                displayTasks();
            }
        };
        li.append(span,deleteBtn);
        taskList.appendChild(li);
    });
}
const saveTasks=()=>localStorage.setItem("tasks",JSON.stringify(tasks));