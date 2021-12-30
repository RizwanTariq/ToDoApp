const form = document.getElementById("task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");

//Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!taskInput.value.trim()) {
    alert("Please Enter a Task");
  } else {
    //Create li tag
    const listItem = document.createElement("li");
    //add class
    listItem.className = "collection-item";
    //Append task to li
    listItem.appendChild(document.createTextNode(taskInput.value));

    //create ancor tag
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.href = "#";
    //appending i into ancor tag
    link.innerHTML = `<i class="material-icons">close</i>`;

    //appending ancor into li tag
    listItem.appendChild(link);

    //append li into ul
    taskList.appendChild(listItem);
    //resetting input field
    taskInput.value = "";
  }
});

//Remove single task
taskList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
});

//Clear task list
clearBtn.addEventListener("click", (e) => {
  if (taskList.innerHTML === "") {
    alert("No tasks in list.");
  } else {
    if (confirm("Are you sure?")) {
      e.preventDefault();
      taskList.innerHTML = "";
    }
  }
});

//Filter Tasks List

filter.addEventListener("keyup", (e) => {
  const text = e.target.value.toLowerCase();
  const list = document.querySelectorAll(".collection-item");
  list.forEach((task) => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) === -1) {
      task.style.display = "none";
    } else {
      task.style.display = "block";
    }
  });
});
