/**
 * Sample test data (would come from API in real app)
 */
const mockTests = [
    {
        id: 1,
        title: "JEE Main Full Test #1",
        category: "full-length",
        description: "Complete simulation of JEE Main with 90 questions from Physics, Chemistry, and Mathematics.",
        questions: 90,
        duration: "3 Hours",
        difficulty: "Medium",
        attempts: 1245,
        averageScore: "68%"
    },
    {
        id: 2,
        title: "Physics Advanced Test",
        category: "subject-wise",
        description: "Advanced level physics questions covering all chapters for JEE Advanced preparation.",
        questions: 30,
        duration: "1 Hour",
        difficulty: "Hard",
        attempts: 876,
        averageScore: "52%"
    },
    {
        id: 3,
        title: "Organic Chemistry Test",
        category: "chapter-wise",
        description: "Comprehensive test on Organic Chemistry covering all important reactions and mechanisms.",
        questions: 25,
        duration: "45 Minutes",
        difficulty: "Medium",
        attempts: 932,
        averageScore: "61%"
    },
    {
        id: 4,
        title: "JEE Main 2022 Paper 1",
        category: "previous-year",
        description: "Actual JEE Main 2022 Paper 1 with original questions and time constraints.",
        questions: 90,
        duration: "3 Hours",
        difficulty: "Mixed",
        attempts: 2103,
        averageScore: "65%"
    },
    {
        id: 5,
        title: "Mathematics Advanced Test",
        category: "subject-wise",
        description: "Challenging mathematics problems for JEE Advanced aspirants.",
        questions: 30,
        duration: "1 Hour",
        difficulty: "Hard",
        attempts: 754,
        averageScore: "48%"
    },
    {
        id: 6,
        title: "JEE Main Full Test #2",
        category: "full-length",
        description: "Second full-length test simulating JEE Main examination conditions.",
        questions: 90,
        duration: "3 Hours",
        difficulty: "Medium",
        attempts: 987,
        averageScore: "71%"
    }
    // More tests...
];

// DOM Elements
const testList = document.querySelector('.test-list');
const categoryTabs = document.querySelectorAll('.category-tabs button');

/**
 * Displays mock tests
 * param {Array} tests - Array of test objects
 */
function displayTests(testsToDisplay) {
    testList.innerHTML = ''; // Clear existing tests
    
    testsToDisplay.forEach(test => {
        const testCard = document.createElement('div');
        testCard.className = 'test-card';
        testCard.innerHTML = `
            <div class="test-header">
                <h3>${test.title}</h3>
                <span class="test-tag ${test.category.replace(' ', '-')}">${formatCategory(test.category)}</span>
            </div>
            <div class="test-details">
                <p>${test.description}</p>
                <ul class="test-meta">
                    <li><i class="fas fa-question-circle"></i> ${test.questions} Questions</li>
                    <li><i class="fas fa-clock"></i> ${test.duration}</li>
                    <li><i class="fas fa-star"></i> Difficulty: ${test.difficulty}</li>
                </ul>
            </div>
            <div class="test-actions">
                <a href="test-instructions.html?id=${test.id}" class="btn btn-primary">Start Test</a>
                <a href="#" class="btn btn-outline">View Analysis</a>
            </div>
        `;
        testList.appendChild(testCard);
    });
}

// Format category for display
function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Filter tests by category
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const category = tab.dataset.category;
        if (category === 'all') {
            displayTests(mockTests);
        } else {
            const filteredTests = mockTests.filter(test => test.category === category);
            displayTests(filteredTests);
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayTests(mockTests);
});