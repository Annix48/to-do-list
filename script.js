const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Загружаем задачи из localStorage при старте
window.addEventListener("load", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed);
  });
});

// Функция для добавления задачи в DOM и навешивания событий
function addTaskToDOM(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Сохраняем задачи в localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  addTaskToDOM(taskText);
  saveTasks();
  taskInput.value = "";
});

// ... предыдущий код без изменений ...

const filterAllBtn = document.getElementById('filterAll');
const filterActiveBtn = document.getElementById('filterActive');
const filterCompletedBtn = document.getElementById('filterCompleted');

function filterTasks(filter) {
  const tasks = taskList.querySelectorAll('li');
  tasks.forEach(task => {
    switch (filter) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'active':
        task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
        break;
      case 'completed':
        task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
        break;
    }
  });
}

function setActiveButton(button) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

filterAllBtn.addEventListener('click', () => {
  filterTasks('all');
  setActiveButton(filterAllBtn);
});

filterActiveBtn.addEventListener('click', () => {
  filterTasks('active');
  setActiveButton(filterActiveBtn);
});

filterCompletedBtn.addEventListener('click', () => {
  filterTasks('completed');
  setActiveButton(filterCompletedBtn);
});

// По умолчанию показываем все задачи
filterTasks('all');
