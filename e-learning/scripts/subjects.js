/**
 * SUBJECTS.JS - JavaScript for subjects page
 * 
 * Handles:
 * - Displaying subject cards
 * - Chapter/topic navigation
 * - Progress tracking visualization
 */

// DOM Elements
const subjectsContainer = document.querySelector('.subjects-grid');
const chaptersContainer = document.querySelector('.chapters-grid');

/**
 * Sample subject data (would come from API in real app)
 */
const subjectsData = [
    {
        name: "Physics",
        icon: "fa-atom",
        description: "Master mechanics, electromagnetism, and modern physics.",
        progress: 75,
        chapters: [
            {
                title: "Mechanics",
                topics: ["Kinematics", "Newton's Laws", "Work, Energy, Power"]
            }
            // More chapters...
        ]
    }
    // More subjects...
];

/**
 * Initializes the subjects page
 */
function initSubjectsPage() {
    displaySubjects();
    displayChapters();
}

/**
 * Displays subject cards
 */
function displaySubjects() {
    subjectsData.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.className = `subject-card ${subject.name.toLowerCase()}`;
        subjectCard.innerHTML = `
            <div class="subject-icon">
                <i class="fas ${subject.icon}"></i>
            </div>
            <h3>${subject.name}</h3>
            <p>${subject.description}</p>
            <div class="subject-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${subject.progress}%"></div>
                </div>
                <span>${subject.progress}% Complete</span>
            </div>
            <a href="${subject.name.toLowerCase()}.html" class="btn btn-primary">
                Explore ${subject.name}
            </a>
        `;
        subjectsContainer.appendChild(subjectCard);
    });
}

/**
 * Displays chapters and topics
 */
function displayChapters() {
    // Using Physics chapters as example
    const physics = subjectsData.find(s => s.name === "Physics");
    
    physics.chapters.forEach(chapter => {
        const chapterCard = document.createElement('div');
        chapterCard.className = 'chapter-card';
        chapterCard.innerHTML = `
            <h4>${chapter.title}</h4>
            <ul class="topics-list">
                ${chapter.topics.map(topic => 
                    <li><a href="#">${topic}</a></li>
                ).join('')}
            </ul>
        `;
        chaptersContainer.appendChild(chapterCard);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', initSubjectsPage);