/**
 * PRACTICE.JS - JavaScript for practice questions page
 * 
 * Handles:
 * - Displaying practice questions
 * - Answer submission and validation
 * - Question filtering
 * - Explanation toggling
 */

// DOM Elements
const questionsContainer = document.querySelector('.practice-questions');
const filterForm = document.querySelector('.practice-filters');
const showAnswerButtons = document.querySelectorAll('.btn-show-answer');
const submitAnswerButtons = document.querySelectorAll('.btn-submit-answer');

/**
 * Sample question data (would come from API in real app)
 */
const questions = [
    {
        id: 1,
        question: "A particle moves along a straight line...",
        subject: "Physics",
        difficulty: "Medium",
        options: ["6 m/s²", "-6 m/s²", "12 m/s²", "-12 m/s²"],
        correctAnswer: "B",
        explanation: "First find velocity by differentiating position..."
    }
    // More questions...
];

/**
 * Initializes the practice page
 */
function initPracticePage() {
    displayQuestions();
    setupEventListeners();
}

/**
 * Displays practice questions
 */
function displayQuestions() {
    questions.forEach((q, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.innerHTML = `
            <div class="question-header">
                <span class="question-number">Q${index + 1}</span>
                <span class="question-meta">
                    <span class="subject-tag ${q.subject.toLowerCase()}">${q.subject}</span>
                    <span class="difficulty-tag ${q.difficulty.toLowerCase()}">${q.difficulty}</span>
                </span>
            </div>
            <div class="question-content">
                <p>${q.question}</p>
            </div>
            <div class="question-options">
                ${q.options.map((opt, i) => `
                    <div class="option">
                        <input type="radio" id="q${index}-option${i+1}" 
                               name="q${index}" value="${String.fromCharCode(65 + i)}">
                        <label for="q${index}-option${i+1}">${opt}</label>
                    </div>
                `).join('')}
            </div>
            <div class="question-actions">
                <button class="btn btn-outline btn-show-answer">Show Answer</button>
                <button class="btn btn-primary btn-submit-answer">Submit</button>
            </div>
            <div class="question-explanation">
                <p><strong>Explanation:</strong> ${q.explanation}</p>
                <p><strong>Correct Answer:</strong> ${q.correctAnswer}</p>
            </div>
        `;
        questionsContainer.appendChild(questionCard);
    });
}

/**
 * Sets up event listeners
 */
function setupEventListeners() {
    // Show answer buttons
    document.querySelectorAll('.btn-show-answer').forEach(btn => {
        btn.addEventListener('click', function() {
            const explanation = this.closest('.question-card')
                              .querySelector('.question-explanation');
            explanation.style.display = explanation.style.display === 'block' 
                ? 'none' 
                : 'block';
            this.textContent = explanation.style.display === 'block' 
                ? 'Hide Answer' 
                : 'Show Answer';
        });
    });

    // Submit answer buttons
    document.querySelectorAll('.btn-submit-answer').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionCard = this.closest('.question-card');
            const selectedOption = questionCard.querySelector(
                'input[type="radio"]:checked'
            );
            
            if (!selectedOption) {
                alert('Please select an answer before submitting.');
                return;
            }
            
            const explanation = questionCard.querySelector('.question-explanation');
            explanation.style.display = 'block';
            this.disabled = true;
            
            // Disable all options
            questionCard.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = true;
            });
        });
    });

    // Filter form submission
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        // In real app, would filter questions based on criteria
        console.log('Filters applied:', Object.fromEntries(formData));
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', initPracticePage);