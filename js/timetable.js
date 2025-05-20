// Generate time slots from 7:00 AM to 10:00 PM
function generateTimeSlots() {
    const slots = [];
    for (let hour = 7; hour <= 22; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        slots.push(time);
    }
    return slots;
}

// Initialize timetable
function initializeTimetable() {
    const timetableBody = document.getElementById('timetableBody');
    const timeSlots = generateTimeSlots();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    timeSlots.forEach(time => {
        const row = document.createElement('tr');
        
        // Add time column
        const timeCell = document.createElement('td');
        timeCell.className = 'border p-2 bg-gray-50 font-medium';
        timeCell.textContent = time;
        row.appendChild(timeCell);

        // Add cells for each day
        days.forEach(day => {
            const cell = document.createElement('td');
            cell.className = 'time-block border p-2';
            cell.dataset.day = day;
            cell.dataset.time = time;
            cell.addEventListener('click', () => openEditModal(cell));
            row.appendChild(cell);
        });

        timetableBody.appendChild(row);
    });
}

// Modal handling
let currentCell = null;

function openEditModal(cell) {
    currentCell = cell;
    const modal = document.getElementById('editModal');
    const taskName = document.getElementById('taskName');
    const taskCategory = document.getElementById('taskCategory');

    // Set current values if they exist
    if (cell.dataset.task) {
        taskName.value = cell.dataset.task;
        taskCategory.value = cell.dataset.category;
    } else {
        taskName.value = '';
        taskCategory.value = 'study';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('editModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    currentCell = null;
}

// Save task
function saveTask() {
    if (!currentCell) return;

    const taskName = document.getElementById('taskName').value;
    const taskCategory = document.getElementById('taskCategory').value;

    if (taskName.trim()) {
        currentCell.dataset.task = taskName;
        currentCell.dataset.category = taskCategory;
        currentCell.textContent = taskName;
        currentCell.className = `time-block border p-2 ${taskCategory}`;
    }

    closeModal();
    updateTodayTasks();
}

// Delete task
function deleteTask() {
    if (!currentCell) return;

    currentCell.dataset.task = '';
    currentCell.dataset.category = '';
    currentCell.textContent = '';
    currentCell.className = 'time-block border p-2';

    closeModal();
    updateTodayTasks();
}

// Update Today's Tasks
function updateTodayTasks() {
    const todayTasks = document.getElementById('todayTasks');
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const tasks = [];

    document.querySelectorAll('.time-block').forEach(cell => {
        if (cell.dataset.day === today && cell.dataset.task) {
            tasks.push({
                time: cell.dataset.time,
                task: cell.dataset.task,
                category: cell.dataset.category
            });
        }
    });

    todayTasks.innerHTML = tasks.length ? tasks.map(task => `
        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div class="flex items-center">
                <div class="w-3 h-3 ${task.category} rounded-full mr-2"></div>
                <span class="font-medium">${task.time}</span>
                <span class="ml-2">${task.task}</span>
            </div>
        </div>
    `).join('') : '<p class="text-gray-500">No tasks scheduled for today</p>';
}

// Save changes to localStorage
function saveChanges() {
    const timetable = {};
    document.querySelectorAll('.time-block').forEach(cell => {
        if (cell.dataset.task) {
            const key = `${cell.dataset.day}-${cell.dataset.time}`;
            timetable[key] = {
                task: cell.dataset.task,
                category: cell.dataset.category
            };
        }
    });

    localStorage.setItem('timetable', JSON.stringify(timetable));
    alert('Changes saved successfully!');
}

// Load saved timetable
function loadTimetable() {
    const saved = localStorage.getItem('timetable');
    if (saved) {
        const timetable = JSON.parse(saved);
        Object.entries(timetable).forEach(([key, value]) => {
            const [day, time] = key.split('-');
            const cell = document.querySelector(`.time-block[data-day="${day}"][data-time="${time}"]`);
            if (cell) {
                cell.dataset.task = value.task;
                cell.dataset.category = value.category;
                cell.textContent = value.task;
                cell.className = `time-block border p-2 ${value.category}`;
            }
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeTimetable();
    loadTimetable();
    updateTodayTasks();

    document.getElementById('saveTask').addEventListener('click', saveTask);
    document.getElementById('deleteTask').addEventListener('click', deleteTask);
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('saveChanges').addEventListener('click', saveChanges);
}); 