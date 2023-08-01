{
    let tasks = [
        {
            content: "zadanie pierwsze",
            done: false,
        },
        {
            content: "zadanie drugie",
            done: true,
        },
    ];
    let hideDoneTasks = false;

    
    const toggleTaskDone = (taskIndex) => {
        tasks = [
          ...tasks.slice(0, taskIndex),
        {
            ...tasks[taskIndex],
            done: !tasks[taskIndex].done,
        },
         ...tasks.slice(taskIndex + 1),
        ];
    
    render();    
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const bindButtonsEvents = () => {

        const allDoneTask = document.querySelector(".js-allDoneTaskButton");

        if (allDoneTask) {
            allDoneTask.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButtons = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButtons) {
            toggleHideDoneTasksButtons.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-Buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = ` 
        <button class="container__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
        <button class="container__button js-allDoneTaskButton"
         ${tasks.every(({done})=>done) ? "disabled" : ""}>Ukończ wszystkie</button>
        `;
    }

    const renderTasks = () => {
        const taskToHTML = task =>
        
            `<li class = "
            tasks__item${task.done && hideDoneTasks ? " task__hiden" : ""}">
            <button class="js-toggleDone">${task.done ? "✔" : ""}</button>
            <div class="task__list ${task.done ? "task__list--done" : ""}">${task.content}</div>
            <button class="js-remove">🗑</button>
            </li>
            `
            const taskElement = document.querySelector(".js-tasks");
            taskElement.innerHTML = tasks.map(taskToHTML).join("");
        }

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    }

    const form_trim = (event) => {
        event.preventDefault();

        const newContent = document.querySelector(".js-input");
        const newTask = newContent.value.trim();

        if (newTask !== "") {
            addNewTask(newTask);
            newContent.value = "";
        }

        newContent.focus();
    }
    const bindRemoveEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-remove");
        deleteButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };
    const bindToggleDoneEvents = () => {
        const toggleButtons = document.querySelectorAll(".js-toggleDone");
        toggleButtons.forEach((toggleButton, index) => {
            toggleButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        })
    }

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();
        renderButtons();
        bindButtonsEvents();
    }

    const init = () => {
        render();
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", form_trim);
    };

    init();
}