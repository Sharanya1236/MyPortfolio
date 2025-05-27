document.addEventListener('DOMContentLoaded', function() {
    // 1. Typewriter Effect
    const typewriterTextElement = document.querySelector('.typewriter-text');
    const phrases = [
        "a Web Developer",
        "a Data Analyst",
        "a Learner",
        "a Problem Solver"
    ]; // You can customize these phrases
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // milliseconds per character
    let deletingSpeed = 60; // milliseconds per character
    let pauseBeforeDeleting = 1500; // milliseconds
    let pauseBeforeTyping = 500; // milliseconds

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Deleting text
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentTypingSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Done typing, start deleting after a pause
            currentTypingSpeed = pauseBeforeDeleting;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Done deleting, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Loop through phrases
            currentTypingSpeed = pauseBeforeTyping;
        }

        setTimeout(typeWriter, currentTypingSpeed);
    }

    // Start the typewriter effect only if the element exists
    if (typewriterTextElement) {
        typeWriter();
    }


    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href'); // Get the href (e.g., "#about")
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight; // Get header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open (important for responsive design)
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });


    // 3. Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight; // Adjust for fixed header
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });


    // 4. Hamburger Menu Functionality (for mobile)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside (optional, but good UX)
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });


    // 5. Update Current Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});