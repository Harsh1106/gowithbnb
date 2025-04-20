document.addEventListener('DOMContentLoaded', function() {
    // Property data - in a real app, this would come from an API
    const properties = [];
    const propertyTypes = ['Apartment', 'House', 'Cabin', 'Beachfront', 'Villa', 'Loft'];
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Austin', 'Denver'];
    
    // Generate 50 properties
    for (let i = 1; i <= 50; i++) {
        properties.push({
            id: i,
            title: `Beautiful ${propertyTypes[Math.floor(Math.random() * propertyTypes.length)]} in ${locations[Math.floor(Math.random() * locations.length)]}`,
            price: Math.floor(Math.random() * 300) + 50,
            rating: (Math.random() * 1 + 4).toFixed(1),
            type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
            image: `assets/images/property${i}.jpg`
        });
    }
    
    // DOM elements
    const propertyGrid = document.getElementById('propertyGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Initial display
    let visibleCount = 12;
    let currentFilter = 'All';
    displayProperties();
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter and reset display
            currentFilter = this.textContent;
            visibleCount = 12;
            displayProperties();
        });
    });
    
    // Load more functionality
    loadMoreBtn.addEventListener('click', function() {
        visibleCount += 12;
        displayProperties();
        
        // Hide button if all properties are shown
        if (visibleCount >= filteredProperties().length) {
            loadMoreBtn.style.display = 'none';
        }
    });
    
    // Get filtered properties
    function filteredProperties() {
        if (currentFilter === 'All') {
            return properties;
        }
        return properties.filter(property => property.type === currentFilter);
    }
    
    // Display properties
    function displayProperties() {
        const filtered = filteredProperties();
        const toDisplay = filtered.slice(0, visibleCount);
        
        propertyGrid.innerHTML = '';
        
        if (toDisplay.length === 0) {
            propertyGrid.innerHTML = '<p class="no-results">No properties found for this filter.</p>';
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        toDisplay.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            propertyCard.innerHTML = `
                <div class="property-image">
                    <img class="lazyload" data-src="${property.image}" alt="${property.title}" loading="lazy">
                </div>
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <div class="property-price">$${property.price} per night</div>
                    <div class="rating">★ ${property.rating}</div>
                </div>
            `;
            propertyGrid.appendChild(propertyCard);
        });
        
        // Initialize lazy loading
        if (typeof lazysizes !== 'undefined') {
            lazysizes.init();
        }
        
        // Show/hide load more button
        loadMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'block';
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Performance monitoring (for demonstration)
    if ('performance' in window) {
        const perfEntries = performance.getEntriesByType("navigation");
        if (perfEntries.length > 0) {
            const navTiming = perfEntries[0];
            console.log('Page load time:', navTiming.loadEventEnd - navTiming.startTime, 'ms');
        }
    }
});