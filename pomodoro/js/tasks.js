const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const pomodoroCountInput = document.getElementById("pomodoro-count");
const taskContainer = document.querySelector(".task-container > ul");

if (taskForm) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    try {
      const taskText = taskInput.value.trim();
      const pomodoroCount = pomodoroCountInput.value.trim();
      
      if (taskText && pomodoroCount) {
        const li = document.createElement("li");
        li.className = "tasks";
        li.setAttribute("data-pomodoros", pomodoroCount);
        li.innerHTML = `<span class="task-info"><span class="task-text">${taskText}</span> | <span class="task-count">${pomodoroCount}</span> pomodoro${pomodoroCount > 1 ? "s" : ""}</span><i class="fas fa-trash delete-icon"></i>`;
        
        if (taskContainer) {
          taskContainer.appendChild(li);
        }
        
        taskInput.value = "";
        pomodoroCountInput.value = "";
        
        saveTasks();
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  });
}

function decrementFirstTask() {
  try {
    if (!taskContainer) return;
    
    const firstTask = taskContainer.querySelector(".tasks");
    if (!firstTask) return;
    
    let count = parseInt(firstTask.getAttribute("data-pomodoros"));
    if (isNaN(count)) return;
    
    count--;
    
    if (count <= 0) {
      firstTask.remove();
    } else {
      firstTask.setAttribute("data-pomodoros", count);
      const countSpan = firstTask.querySelector(".task-count");
      if (countSpan) {
        countSpan.textContent = count;
        const textAfterCount = count > 1 ? " pomodoros" : " pomodoro";
        countSpan.nextSibling.textContent = textAfterCount;
      }
    }
    
    saveTasks();
  } catch (error) {
    console.error("Failed to decrement task:", error);
  }
}

if (taskContainer) {
  taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
      try {
        e.target.parentElement.remove();
        saveTasks();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  });
}
