// script.js
const incrementBtn = document.getElementById('incrementBtn');
const clickCountSpan = document.getElementById('clickCount');

// Function to handle button click
incrementBtn.addEventListener('click', () => {
    // Get the current count from local storage
    let currentCount = localStorage.getItem('clickCount');
    currentCount = currentCount ? parseInt(currentCount) : 0;

    // Increment the count
    currentCount++;

    // Update the count displayed on the webpage
    clickCountSpan.textContent = currentCount;

    // Store the updated count in local storage
    localStorage.setItem('clickCount', currentCount);
});

// Fetch the initial count from local storage when the page loads
window.addEventListener('load', () => {
    const initialCount = localStorage.getItem('clickCount');
    if (initialCount) {
        clickCountSpan.textContent = initialCount;
    }
});
