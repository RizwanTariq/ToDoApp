const form = document.getElementById("task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");

renderList();
function renderList() {
  const list = JSON.parse(localStorage.getItem("taskList"));
  if (list) {
    list.forEach((task) => {
      //Create li tag
      const listItem = document.createElement("li");

      //add class
      listItem.className = "collection-item";

      //Append task to li
      listItem.appendChild(document.createTextNode(task));

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
    });
  }
}

//Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!taskInput.value.trim()) {
    actionAlert("Please Enter a Task!", "info");
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

    //Store task in local storage
    storeTaskInLS(taskInput.value);
    //resetting input field
    taskInput.value = null;
  }
});

//Remove single task
taskList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete-item")) {
    const task = e.target.parentElement.parentElement.childNodes[0];
    e.target.parentElement.parentElement.remove();
    removeTaskFromLS(task);
  }
});

//Clear task list
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskList.innerHTML === "") {
    actionAlert("No tasks in the list!", "info");
  } else {
    confirmClear().then((willDelete) => {
      if (willDelete) {
        clearList();
        actionAlert("List has been cleared!");
      }
    });
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

//Utility functions

function removeTaskFromLS(task) {
  const list = JSON.parse(localStorage.getItem("taskList"));
  const newTaskList = [];
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] !== task) newTaskList.push(list[i]);
  }
  if (newTaskList.length === 0) localStorage.removeItem("taskList");
  localStorage.setItem("taskList", JSON.stringify(newTaskList));
}
function clearList() {
  return (() => {
    taskList.innerHTML = "";
    localStorage.clear();
  })();
}
function storeTaskInLS(item) {
  const list =
    localStorage.length !== 0
      ? JSON.parse(localStorage.getItem("taskList"))
      : [];
  list.push(item);
  localStorage.setItem("taskList", JSON.stringify(list));
}

function actionAlert(
  title,
  icon = "success",
  btnColorClass = "teal accent-4",
  text = "",
  btnText = "OK"
) {
  return swal({
    title: title,
    text: text,
    icon: icon,
    button: {
      text: btnText,
      className: btnColorClass,
    },
  });
}

function confirmClear() {
  return swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this List!",
    icon: "warning",
    buttons: {
      cancel: {
        text: "Cancel",
        visible: true,
        className: "grey lighten-5",
      },
      confirm: {
        text: "OK",
        className: "red lighten-1",
      },
    },
    dangerMode: true,
  });
}
