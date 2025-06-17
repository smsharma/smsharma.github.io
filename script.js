document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle-text');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        toggle.textContent = 'light';
    }
    
    // Toggle theme on click
    toggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update toggle text and save preference
        if (body.classList.contains('dark-mode')) {
            toggle.textContent = 'light';
            localStorage.setItem('theme', 'dark');
        } else {
            toggle.textContent = 'dark';
            localStorage.setItem('theme', 'light');
        }
    });
});