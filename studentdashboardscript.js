// Dynamic Attendance Data (Replace with API data)
const attendanceData = {
    present: 85,
    absent: 15
};

// Attendance Chart
const ctxAttendance = document.getElementById('attendanceChart').getContext('2d');
new Chart(ctxAttendance, {
    type: 'doughnut',
    data: {
        labels: ['Present', 'Absent'],
        datasets: [{
            data: [attendanceData.present, attendanceData.absent],
            backgroundColor: ['#28a745', '#dc3545'],
            hoverOffset: 5
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        }
    }
});

// Dynamic Exam Performance Data (Replace with API data)
const performanceData = {
    subjects: ['Math', 'Science', 'English', 'History', 'CS'],
    marks: [90, 75, 85, 80, 95]
};

// Generate random colors for bars
const barColors = performanceData.subjects.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);

// Performance Chart
const ctxPerformance = document.getElementById('performanceChart').getContext('2d');
new Chart(ctxPerformance, {
    type: 'bar',
    data: {
        labels: performanceData.subjects,
        datasets: [{
            label: 'Marks (%)',
            data: performanceData.marks,
            backgroundColor: barColors,
            borderColor: barColors.map(color => color.replace('0.7', '1')),
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return ` ${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        }
    }
});

// Sample Events Data (Replace with API data)
const events = [
    {
        title: "AI Workshop",
        date: "2025-04-10",
        description: "A deep dive into AI & Machine Learning trends.",
        guest: "Dr. John Doe (AI Expert, Google)"
    },
    {
        title: "Mid-Sem Exams",
        date: "2025-04-15",
        description: "Mid-Semester Exams for all courses.",
        guest: "University Examination Committee"
    },
    {
        title: "Placement Drive",
        date: "2025-04-25",
        description: "Top MNCs hiring for software & management roles.",
        guest: "HR Heads from Infosys, TCS, and Amazon"
    }
];

// Sort events by date
events.sort((a, b) => new Date(a.date) - new Date(b.date));

// Load Events into the Calendar
const eventList = document.getElementById('eventList');
events.forEach((event, index) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `📅 <strong>${formatDate(event.date)}:</strong> ${event.title}`;
    listItem.onclick = () => openModal(index);
    eventList.appendChild(listItem);
});

// Format Date (YYYY-MM-DD to Month DD, YYYY)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Event Modal
const modal = document.getElementById("eventModal");
const closeModal = document.getElementsByClassName("close")[0];

function openModal(index) {
    document.getElementById("eventTitle").innerText = events[index].title;
    document.getElementById("eventDescription").innerText = events[index].description;
    document.getElementById("eventGuest").innerText = events[index].guest;
    document.getElementById("eventDate").innerText = formatDate(events[index].date);
    modal.style.display = "flex";
}

closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Event Reminder (Show alert if an event is today)
function checkEventReminders() {
    const today = new Date().toISOString().split('T')[0];
    events.forEach(event => {
        if (event.date === today) {
            alert(`📅 Reminder: ${event.title} is happening today!`);
        }
    });
}

// Run event reminder check on page load
checkEventReminders();
