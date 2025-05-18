document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const dropdown = document.getElementById("dropdown");
  const taskBtn = document.getElementById("task");
  const container = document.getElementById("container");
  const addTaskDiv = document.getElementById("add-task");
  const cancelBtn = document.getElementById("cancel");
  const resultView = document.getElementById("view");
  const resultList = document.getElementById("result");

  // Toggle dropdown menu
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== menu) {
      dropdown.style.display = "none";
    }
  });

  // Show task input form
  taskBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    container.style.display = "none";
    addTaskDiv.style.display = "block";
  });

  // Cancel button returns to initial screen
  cancelBtn.addEventListener("click", () => {
    addTaskDiv.style.display = "none";
    container.style.display = "block";
  });

  // Save tasks to localStorage
  window.saveToStorage = function () {
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    const taskValue = document.getElementById("task_details").value.trim();

    if (!selectedCategory) {
      alert("Select the task type.");
      return;
    }

    if (taskValue === "") {
      alert("Enter the task.");
      return;
    }

    const category = selectedCategory.value;
    const savedTasks = JSON.parse(localStorage.getItem("saveElement")) || {};

    if (!savedTasks[category]) {
      savedTasks[category] = [];
    }

    savedTasks[category].push(taskValue);
    localStorage.setItem("saveElement", JSON.stringify(savedTasks));

    // Reset input and UI
    document.getElementById("task_details").value = "";
    alert("Task saved!");

    addTaskDiv.style.display = "none";
    container.style.display = "block";
  };

  // Display tasks from a specific category
  window.displayTasksByCategory = function (category) {
    const savedTasks = JSON.parse(localStorage.getItem("saveElement")) || {};
    const tasks = savedTasks[category] || [];

    if (tasks.length === 0) {
      resultList.innerHTML = `<li>No task in ${category}</li>`;
    } else {
      resultList.innerHTML = tasks
        .map(
          (task, index) => `
        <li style="display:flex; gap:10px; align-items:center;">
          <input type="checkbox" class="rescheck">
          <span class="task-text">${task}</span>
          <button onclick="deleteTask('${category}', ${index})" class="deleteTask">Delete</button>
        </li>
      `
        )
        .join("");
    }

    resultView.style.display = "flex";
  };

  // Delete a specific task
  window.deleteTask = function (category, index) {
    const savedTasks = JSON.parse(localStorage.getItem("saveElement")) || {};
    if (savedTasks[category]) {
      savedTasks[category].splice(index, 1);
      localStorage.setItem("saveElement", JSON.stringify(savedTasks));
      displayTasksByCategory(category);
    }
  };
});
