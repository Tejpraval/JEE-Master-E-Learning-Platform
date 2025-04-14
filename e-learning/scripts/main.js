// Sample course data (in a real app, this would come from an API)
const courses = [
    {
        id: 1,
        title: "Physics: Mechanics Fundamentals",
        description: "Master the basics of mechanics with 20+ video lectures and practice problems.",
        category: "Physics",
        image: "https://www.epictraining.ca/images/Website_Preview/OG_Mechanical1.jpg",
        duration: "12 hours",
        lessons: 24,
        progress: 65,
        instructor: "Dr. Ravi Sharma"
    },
    {
        id: 2,
        title: "Organic Chemistry for JEE",
        description: "Comprehensive coverage of organic chemistry concepts with reaction mechanisms.",
        category: "Chemistry",
        image: "https://img.freepik.com/premium-photo/chemistry-health-scientists-testing-new-therapeutics-closeup-molecule-synthesis-copy-spac_1164591-8549.jpg",
        duration: "15 hours",
        lessons: 30,
        progress: 40,
        instructor: "Prof. Anjali Patel"
    },
    {
        id: 3,
        title: "Calculus for JEE Advanced",
        description: "Advanced calculus concepts with problem-solving techniques for JEE Advanced.",
        category: "Mathematics",
        image: "https://wallpapers.com/images/hd/mathematics-calculus-equations-9yzi8zcga0kzlfth.jpg",
        duration: "18 hours",
        lessons: 36,
        progress: 20,
        instructor: "Dr. Vikram Singh"
    },
    {
        id: 4,
        title: "Electromagnetism Complete Course",
        description: "From basics to advanced problems in electromagnetism for JEE Main & Advanced.",
        category: "Physics",
        image: "https://images.newscientist.com/wp-content/uploads/2020/08/26150002/electromagnetsim-fyckc9_web.jpg?width=1200",
        duration: "20 hours",
        lessons: 40,
        progress: 10,
        instructor: "Dr. Neha Gupta"
    },
    {
        id: 5,
        title: "Physical Chemistry Mastery",
        description: "Thermodynamics, kinetics and other physical chemistry topics explained clearly.",
        category: "Chemistry",
        image: "https://cdn.labmanager.com/assets/articleNo/28908/aImg/52121/scientist-resolves-one-of-the-holy-grails-of-physical-chemistry-s.jpg",
        duration: "14 hours",
        lessons: 28,
        progress: 0,
        instructor: "Prof. Rajesh Kumar"
    },
    {
        id: 6,
        title: "Coordinate Geometry Intensive",
        description: "All concepts of coordinate geometry with shortcut techniques for JEE.",
        category: "Mathematics",
        image: "https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/amar-coordinate-geometry-04-1607429625.png",
        duration: "16 hours",
        lessons: 32,
        progress: 85,
        instructor: "Dr. Sanjay Verma"
    }
];

// DOM Elements
const coursesContainer = document.querySelector('.courses-container');

// Display courses
function displayCourses(coursesToDisplay) {
    coursesContainer.innerHTML = '';
    
    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <a href="course.html?id=${course.id}">
                <div class="course-img">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-book"></i> ${course.lessons} lessons</span>
                    </div>
                    <div class="course-progress">
                        <div class="course-progress-bar" style="width: ${course.progress}%"></div>
                    </div>
                    <div class="course-action">
                        <span>By ${course.instructor}</span>
                        <span>${course.category}</span>
                    </div>
                </div>
            </a>
        `;
        coursesContainer.appendChild(courseCard);
    });
}

// Filter courses by category
const categoryTabs = document.querySelectorAll('.category-tabs button');
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const category = tab.textContent;
        if (category === 'All Courses') {
            displayCourses(courses);
        } else {
            const filteredCourses = courses.filter(course => course.category === category);
            displayCourses(filteredCourses);
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);
    
    // Get course ID from URL for course.html page
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    if (courseId && window.location.pathname.includes('course.html')) {
        // This would be handled in course.js
    }
});


//search bar
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchDropdown = document.getElementById('search-dropdown');
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    
    // Sample course data for search (in real app, this would come from API)
    const searchData = [
        { title: "Mechanics Fundamentals", category: "physics", type: "course" },
        { title: "Organic Chemistry", category: "chemistry", type: "course" },
        { title: "Calculus", category: "mathematics", type: "course" },
        { title: "Projectile Motion", category: "physics", type: "topic" },
        { title: "Chemical Bonding", category: "chemistry", type: "topic" },
        { title: "Integration Techniques", category: "mathematics", type: "topic" },
        { title: "Dr. Ravi Sharma", category: "physics", type: "teacher" },
        { title: "Prof. Anjali Patel", category: "chemistry", type: "teacher" },
        { title: "Dr. Vikram Singh", category: "mathematics", type: "teacher" }
    ];
    
    // Active filters (default all selected)
    let activeFilters = ['physics', 'chemistry', 'mathematics'];
    
    // Update active filters when checkboxes change
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                activeFilters.push(this.value);
            } else {
                activeFilters = activeFilters.filter(f => f !== this.value);
            }
            performSearch(searchInput.value);
        });
    });
    
    // Handle search input
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });
    
    // Handle search button click
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value, true);
    });
    
    // Handle keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value, true);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateSuggestions(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateSuggestions(-1);
        }
    });
    
    // Perform search function
    function performSearch(query, performAction = false) {
        const normalizedQuery = query.toLowerCase().trim();
        
        if (normalizedQuery === '') {
            searchDropdown.style.display = 'none';
            return;
        }
        
        // Filter results based on query and active filters
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(normalizedQuery) && 
            activeFilters.includes(item.category)
        );
        
        displaySearchResults(results);
        
        if (performAction && results.length > 0) {
            // In real app, would navigate to first result or search page
            window.location.href = `course.html?search=${encodeURIComponent(query)}`;
        }
    }
    
    // Display search results in dropdown
    function displaySearchResults(results) {
        searchDropdown.innerHTML = '';
        
        if (results.length === 0) {
            searchDropdown.innerHTML = '<div class="search-suggestion">No results found</div>';
            searchDropdown.style.display = 'block';
            return;
        }
        
        // Group results by type
        const groupedResults = {
            course: results.filter(r => r.type === 'course'),
            topic: results.filter(r => r.type === 'topic'),
            teacher: results.filter(r => r.type === 'teacher')
        };
        
        // Add results to dropdown
        for (const [type, items] of Object.entries(groupedResults)) {
            if (items.length > 0) {
                const header = document.createElement('div');
                header.className = 'search-header';
                header.textContent = type.charAt(0).toUpperCase() + type.slice(1) + 's';
                searchDropdown.appendChild(header);
                
                items.forEach(item => {
                    const suggestion = document.createElement('div');
                    suggestion.className = 'search-suggestion';
                    suggestion.innerHTML = `
                        <i class="fas ${getIconForType(item.type)}"></i>
                        ${item.title} 
                        <span class="search-category">${item.category}</span>
                    `;
                    
                    suggestion.addEventListener('click', () => {
                        navigateToResult(item);
                    });
                    
                    searchDropdown.appendChild(suggestion);
                });
            }
        }
        
        searchDropdown.style.display = 'block';
    }
    
    // Helper function to get icon for result type
    function getIconForType(type) {
        switch(type) {
            case 'course': return 'fa-book';
            case 'topic': return 'fa-tag';
            case 'teacher': return 'fa-user-tie';
            default: return 'fa-search';
        }
    }
    
    // Navigate to selected result
    function navigateToResult(result) {
        // In real app, would navigate to appropriate page
        console.log('Navigating to:', result);
        searchDropdown.style.display = 'none';
        searchInput.value = result.title;
        
        // Example navigation:
        if (result.type === 'course') {
            window.location.href = `course.html?category=${result.category}`;
        }
    }
    
    // Handle keyboard navigation in suggestions
    function navigateSuggestions(direction) {
        const suggestions = Array.from(searchDropdown.querySelectorAll('.search-suggestion'));
        const current = searchDropdown.querySelector('.highlight');
        
        let index = -1;
        if (current) {
            index = suggestions.indexOf(current);
            current.classList.remove('highlight');
        }
        
        index += direction;
        
        if (index >= 0 && index < suggestions.length) {
            suggestions[index].classList.add('highlight');
            suggestions[index].scrollIntoView({ block: 'nearest' });
        } else if (index === suggestions.length) {
            // Return to input
            searchInput.focus();
        }
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchBar.contains(e.target)) {
            searchDropdown.style.display = 'none';
        }
    });
});