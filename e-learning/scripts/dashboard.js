// Initialize Chart.js for study hours
function initStudyHoursChart() {
    const ctx = document.getElementById('hoursChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: [2.5, 1.75, 2, 1.5, 2.25, 1.5, 1],
                backgroundColor: '#4a6bff',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + 'h';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Initialize progress circles
function initProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        const radius = 26;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (progress / 100) * circumference;
        
        const ring = circle.querySelector('.progress-ring-circle');
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = offset;
        ring.style.stroke = '#4a6bff';
    });
}

// Initialize streak calendar
function initStreakCalendar() {
    const streakDays = document.querySelector('.streak-days');
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // Create empty days for first week
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'streak-day empty';
        streakDays.appendChild(emptyDay);
    }
    
    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Create days of month
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'streak-day inactive';
        day.textContent = i;
        
        // Mark today
        if (i === currentDay) {
            day.classList.add('today');
        }
        
        // Randomly mark some days as active (for demo)
        if (i <= currentDay && Math.random() > 0.3) {
            day.classList.remove('inactive');
            day.classList.add('active');
            
            // Add tooltip with study hours
            const tooltip = document.createElement('div');
            tooltip.className = 'streak-tooltip';
            tooltip.textContent = `${Math.floor(Math.random() * 4) + 1} hours studied`;
            day.appendChild(tooltip);
        }
        
        streakDays.appendChild(day);
    }
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    initStudyHoursChart();
    initProgressCircles();
    initStreakCalendar();
});