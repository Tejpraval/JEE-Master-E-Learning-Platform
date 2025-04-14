/**
 * COURSE.JS - Main JavaScript file for course page functionality
 * 
 * This file handles:
 * - Loading course data and displaying it
 * - Video lesson management
 * - Module/lesson navigation
 * - Progress tracking
 */

// Sample course data (in a real app, this would come from an API)
const courses = {
    1: {
        title: "Physics: Mechanics Fundamentals",
        description: "This comprehensive course covers all fundamental concepts of mechanics required for JEE Main and Advanced. Starting with basic kinematics, we'll progress through Newton's laws, work-energy theorem, rotational dynamics, and gravitation. Each concept is explained with multiple examples and problem-solving techniques. By the end of this course, you'll be able to solve complex mechanics problems with confidence.",
        instructor: "Dr. Ravi Sharma",
        category: "Physics",
        videoUrl: "https://www.youtube.com/watch?v=NxPN5KMXT48&list=PLPvaSRcEQh4lfyQYKBRuTiLekgVIw2jvC",  // Main course video
        modules: [ // Array of course modules
            {
                title: "Introduction to Mechanics",
                lessons: [ // Array of lessons in this module
                    { title: "Course Overview", duration: "5:20", videoId: "NxPN5KMXT48", completed: true },
                    { title: "Basic Concepts & Units", duration: "12:45", videoId: "1ZL0WlD0WlQ", completed: true },
                    { title: "Scalars and Vectors", duration: "18:30", videoId: "ihNZlp7iUHE", completed: false }
                ]
            },
            {
                title: "Kinematics",
                lessons: [
                    { title: "Motion in One Dimension", duration: "22:10", videoId: "XVL0iZ4lN7w", completed: false },
                    { title: "Motion in Two Dimensions", duration: "25:45", videoId: "Q53HHMMWtf0", completed: false },
                    { title: "Relative Motion", duration: "15:20", videoId: "3Z8MpzWQxPI", completed: false },
                    { title: "Projectile Motion", duration: "20:15", videoId: "Q53HHMMWtf0", completed: false }
                ]
            },
            {
                title: "Newton's Laws of Motion",
                lessons: [
                    { title: "First Law & Inertial Frames", duration: "14:30", videoId: "1ZL0WlD0WlQ", completed: false },
                    { title: "Second Law & Applications", duration: "28:45", videoId: "ou9YMWlJgkE", completed: false },
                    { title: "Third Law & Constrained Motion", duration: "19:20", videoId: "1ZL0WlD0WlQ", completed: false },
                    { title: "Friction Concepts", duration: "23:10", videoId: "ou9YMWlJgkE", completed: false }
                ]
            }
        ]
    },
    2: {
        title: "Organic Chemistry for JEE",
        description: "Master organic chemistry with this comprehensive course designed specifically for JEE aspirants. Covering all essential topics from GOC to named reactions, this course provides clear explanations and problem-solving strategies.",
        instructor: "Prof. Anjali Patel",
        category: "Chemistry",
        videoUrl: "https://www.youtube.com/watch?v=B_ketdzJtY8",
        modules: [
            {
                title: "General Organic Chemistry",
                lessons: [
                    { title: "Introduction to Organic Chemistry", duration: "8:15", videoId: "6qek4FVX4fc", completed: true },
                    { title: "Resonance & Inductive Effect", duration: "15:30", videoId: "wGCPaQ9_Kjc", completed: true }
                ]
            }
        ]
    },
    3: {
        title: "Calculus for JEE Advanced",
        description: "Advanced calculus concepts with problem-solving techniques for JEE Advanced.",
        instructor: "Dr. Vikram Singh",
        category: "Mathematics",
        videoUrl: "https://www.youtube.com/watch?v=BMAt4ciK6f4&list=PLVLoWQFkZbhUHko1Yhag9NOlDowPoWMMe",
        modules: [
            {
                title: "Calculus for JEE Advanced",
                lessons: [
                    { title: "Real Number System and Inequalities", duration: "8:15", videoId: "6qek4FVX4fc", completed: true },
                    { title: "Resonance & Inductive Effect", duration: "15:30", videoId: "wGCPaQ9_Kjc", completed: true }
                ]
            }
        ]
    }
    //add more course if you want in the same pattern 
     // More courses...
};

// DOM Elements - Cache frequently accessed elements
const courseTitle = document.getElementById('course-title');
const courseDescription = document.getElementById('course-description');
const courseVideo = document.getElementById('course-video');
const modulesContainer = document.querySelector('.modules-container');

// Get course ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

/**
 * Loads course data and initializes the page
 */
function loadCourse() {
    if (courseId && courses[courseId]) {
        const course = courses[courseId];
        
        // Check if course exists
        courseTitle.textContent = course.title;
        courseDescription.textContent = course.description;
        
        // Set video source (convert to embed URL if needed)
        if (course.videoUrl.includes('youtube.com')) {
            // Convert regular YouTube URL to embed URL if needed
            const videoId = course.videoUrl.includes('embed') ? 
                course.videoUrl.split('embed/')[1] :
                course.videoUrl.split('v=')[1].split('&')[0];
            courseVideo.src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            courseVideo.src = course.videoUrl;
        }
        
        // Load modules and lessons
        loadModules(course.modules);
    } else {
        // Redirect to home if course not found
        window.location.href = 'index.html';
    }
}

// Load modules and lessons
function loadModules(modules) {
    modulesContainer.innerHTML = '';  // Clear existing content
    
    modules.forEach((module, moduleIndex) => {
        // Create module content container
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module';
        
        const moduleHeader = document.createElement('div');
        moduleHeader.className = 'module-header';
        moduleHeader.innerHTML = `
            <span>${module.title}</span>
            <i class="fas fa-chevron-right"></i>
        `;
        
        const moduleContent = document.createElement('div');
        moduleContent.className = 'module-content';
        // Add lessons to module
        module.lessons.forEach((lesson, lessonIndex) => {
            const lessonItem = document.createElement('div');
            // Set class based on completion status
            lessonItem.className = `lesson-item ${lesson.completed ? 'completed' : ''} ${moduleIndex === 0 && lessonIndex === 0 ? 'current' : ''}`;
            lessonItem.innerHTML = `
                <span class="lesson-title">${lesson.title}</span>
                <span class="lesson-duration">${lesson.duration}</span>
            `;
            
            // Add click event to load video
            lessonItem.addEventListener('click', () => {
                loadLesson(lesson);
                
                // Update current lesson highlight
                document.querySelectorAll('.lesson-item').forEach(item => {
                    item.classList.remove('current');
                });
                lessonItem.classList.add('current');
            });
            
            moduleContent.appendChild(lessonItem);
        });
        
        // Toggle module content visibility
        moduleHeader.addEventListener('click', () => {
            moduleContent.classList.toggle('show');
            moduleHeader.classList.toggle('active');
        });
        
        moduleElement.appendChild(moduleHeader);
        moduleElement.appendChild(moduleContent);
        modulesContainer.appendChild(moduleElement);
    });
}

// Load lesson video
function loadLesson(lesson) {
    // Ensure we're using the embed URL format
    courseVideo.src = `https://www.youtube.com/embed/${lesson.videoId}`;
    
    // In a real app, you would also:
    // 1. Mark lesson as viewed in the backend
    // 2. Update progress tracking
    // 3. Save current position for resuming later
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadCourse();
});