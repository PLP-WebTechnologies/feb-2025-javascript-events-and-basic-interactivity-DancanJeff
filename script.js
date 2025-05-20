// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initGallery();
    initFormValidation();
    initInteractiveElements();
});

// Tab Functionality
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            tab.classList.add('active');
            const pane = document.getElementById(tab.dataset.tab);
            pane.classList.add('active');
        });
    });
}

// Gallery Functionality
function initGallery() {
    const images = document.querySelectorAll('.gallery-img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.gallery-dots');
    let currentIndex = 0;

    // Create dots for each image
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.style.cssText = 'width: 8px; height: 8px; background: #ddd; border-radius: 50%; cursor: pointer;';
        dot.addEventListener('click', () => showImage(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('span');

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.style.background = '#ddd');
        
        images[index].classList.add('active');
        dots[index].style.background = '#4CAF50';
        currentIndex = index;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Auto advance gallery every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 5000);

    // Show first image initially
    showImage(0);
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.querySelector('.password-strength');

    // Real-time validation
    nameInput.addEventListener('input', () => validateField(nameInput, 'Name is required'));
    emailInput.addEventListener('input', () => validateEmail(emailInput));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput));

    function validateField(input, message) {
        const errorElement = input.nextElementSibling;
        if (!input.value.trim()) {
            errorElement.textContent = message;
            input.style.borderColor = '#f44336';
            return false;
        }
        errorElement.textContent = '';
        input.style.borderColor = '#4CAF50';
        return true;
    }

    function validateEmail(input) {
        const errorElement = input.nextElementSibling;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(input.value)) {
            errorElement.textContent = 'Please enter a valid email address';
            input.style.borderColor = '#f44336';
            return false;
        }
        errorElement.textContent = '';
        input.style.borderColor = '#4CAF50';
        return true;
    }

    function validatePassword(input) {
        const value = input.value;
        const errorElement = input.nextElementSibling;
        
        // Password strength criteria
        const hasLength = value.length >= 8;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        
        let strength = 0;
        if (hasLength) strength++;
        if (hasUpper && hasLower) strength++;
        if (hasNumber) strength++;

        // Update strength indicator
        const colors = ['#f44336', '#FFA726', '#4CAF50'];
        passwordStrength.style.background = `linear-gradient(to right, ${colors[strength-1]} ${(strength/3)*100}%, #ddd ${(strength/3)*100}%)`;

        if (!hasLength) {
            errorElement.textContent = 'Password must be at least 8 characters';
            input.style.borderColor = '#f44336';
            return false;
        }
        
        errorElement.textContent = '';
        input.style.borderColor = '#4CAF50';
        return true;
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateField(nameInput, 'Name is required');
        const isEmailValid = validateEmail(emailInput);
        const isPasswordValid = validatePassword(passwordInput);

        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Color changing button
    const colorButton = document.getElementById('colorButton');
    const colors = ['#4CAF50', '#2196F3', '#F44336', '#FFC107', '#9C27B0'];
    let colorIndex = 0;

    colorButton.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % colors.length;
        colorButton.style.background = colors[colorIndex];
    });

    // Key press display
    const keyDisplay = document.querySelector('.key-display');
    document.addEventListener('keydown', (e) => {
        keyDisplay.textContent = e.key;
        keyDisplay.style.color = colors[Math.floor(Math.random() * colors.length)];
    });

    // Secret button (double click)
    const secretButton = document.getElementById('secretButton');
    secretButton.addEventListener('dblclick', () => {
        secretButton.textContent = '🎉 You found the secret! 🎉';
        secretButton.style.background = '#FF4081';
        
        // Reset after 2 seconds
        setTimeout(() => {
            secretButton.textContent = 'Double Click Me!';
            secretButton.style.background = '#9C27B0';
        }, 2000);
    });
}