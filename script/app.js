const taskInput = $('input');
const taskContainer = $('#task-container');
const allFilter = $('#all');
const pendingFilter = $('#pending');
const completedFilter = $('#completed');
const task_container = document.getElementById('task-container');
const clearAll = document.getElementById('clear_all');
const oneTask = document.getElementsByTagName('p');

const tasks = restoreFromDB();

let filter = null;

function refreshTaskList() {
    clearAll.addEventListener('click', clear_all);

    taskContainer.clear();
    tasks.forEach(function(task, index) {
        if (filter == 'completed' && !task.completed) {
            console.log("task: ", task);
            oneTask.classList.add('checked')
        } 
        if (filter == 'pending' && task.completed) return;

        const taskEl = new TaskElement(index, task);
        taskContainer.appendChild(taskEl.element);
        taskEl.onDelete(function() {
            tasks.splice(index, 1);
            refreshTaskList();
        })

        taskEl.onEdit(function(value) {
            tasks[index] = value;
            refreshTaskList();
        })
    });

    saveToDB(tasks);
}

taskInput.on('keydown', function(event) {
    if (event.key === 'Enter' && taskInput.value.trim()) {
        tasks.push({
            value: taskInput.value.trim(),
            completed: false
        });
        taskInput.value = '';
        refreshTaskList();
    }
})

allFilter.on('click', function() {
    filter = '';
    refreshTaskList();
})

pendingFilter.on('click', function() {
    filter = 'pending';
    refreshTaskList();
})
completedFilter.on('click', function() {
    filter = 'completed';
    refreshTaskList();
})

function clear_all() {
    clearDB(tasks);
    task_container.innerHTML = ``;
}

refreshTaskList();

