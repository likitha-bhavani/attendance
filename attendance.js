// Day-wise Attendance Data
const dayWiseData = [
    { date: "2025-03-20", subject: "Math", status: "✅ Present", faculty: "Mr. Sharma", contact: "9876543210" },
    { date: "2025-03-21", subject: "Science", status: "❌ Absent", faculty: "Ms. Priya", contact: "9876543220" }
];

const dayWiseTable = document.getElementById('dayWiseTable');
dayWiseData.forEach(row => {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.date}</td>
                    <td>${row.subject}</td>
                    <td>${row.status}</td>
                    <td>${row.faculty} (${row.contact})</td>
                    <td><button onclick="chatFaculty('${row.faculty}')">💬 Chat</button></td>`;
    dayWiseTable.appendChild(tr);
});

// Attendance Chart Data
const weekAttendanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
        label: 'Attendance %',
        data: [85, 70, 90, 80],
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
    }]
};

const monthAttendanceData = {
    labels: ['Math', 'Science', 'English'],
    datasets: [{
        label: 'Attendance %',
        data: [80, 65, 90],
        backgroundColor: ['#007bff', '#dc3545', '#28a745']
    }]
};

const semesterAttendanceData = {
    labels: ['Math', 'Science', 'English'],
    datasets: [{
        label: 'Attendance %',
        data: [85, 70, 75],
        backgroundColor: ['#6610f2', '#fd7e14', '#17a2b8']
    }]
};

// Initialize Charts
new Chart(document.getElementById('weekAttendanceChart').getContext('2d'), {
    type: 'bar',
    data: weekAttendanceData,
    options: { responsive: true }
});

new Chart(document.getElementById('monthAttendanceChart').getContext('2d'), {
    type: 'bar',
    data: monthAttendanceData,
    options: { responsive: true }
});

new Chart(document.getElementById('semesterAttendanceChart').getContext('2d'), {
    type: 'bar',
    data: semesterAttendanceData,
    options: { responsive: true }
});

// Download Attendance Reports
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Attendance Report", 10, 10);
    doc.save("Attendance_Report.pdf");
}

function downloadExcel() {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(dayWiseData);
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "Attendance_Report.xlsx");
}

// Chat Faculty Function
function chatFaculty(faculty) {
    alert(`Chat with ${faculty}`);
}

// Toggle Attendance Sections
function showSection(section) {
    document.querySelectorAll(".attendance-section").forEach(div => {
        div.style.display = "none";
    });
    document.getElementById(section).style.display = "block";
}
