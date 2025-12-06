document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    // 'save' parameter controls whether to save to Local Storage (used when loading existing tasks)
    function addTask(taskText = null, save = true) {
        const text = taskText || taskInput.value.trim();
        if (text === "") {
            if (!taskText) alert("Please enter a task."); // Only alert if user manually adds task
            return;
        }

        // Create list item and remove button
        const li = document.createElement('li');
        li.textContent = text;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            // Update Local Storage after removal
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== text);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field if task was added by user
        if (!taskText) taskInput.value = '';

        // Save task to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false)); // 'false' prevents re-saving
    }

    // Initialize
    loadTasks();

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });
});