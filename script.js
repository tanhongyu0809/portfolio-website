document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only run custom cursor logic if not on a touch device
    if(window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a slight delay to the outline for a smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect on interactable elements
        const hoverElements = document.querySelectorAll('a, .btn, .social-icon, .menu-icon');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }

    // --- 2. Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    const textArray = ["Software Engineering Student", "Full-Stack Developer", "AI Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(type, 1000);

    // --- 3. Mobile Menu Toggle ---
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        icon.classList.toggle('bx-menu');
        icon.classList.toggle('bx-x');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuIcon.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        });
    });

    // --- 4. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 5. Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                // Apply stagger delay if defined in HTML style attribute
                const delay = reveal.style.getPropertyValue('--delay');
                if (delay) {
                    reveal.style.transitionDelay = delay;
                }
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // --- 6. 3D Tilt Effect on Cards (Vanilla JS) ---
    const tiltElements = document.querySelectorAll('.tilt-element');
    
    if(window.matchMedia("(pointer: fine)").matches) {
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
                const rotateY = ((x - centerX) / centerX) * 10;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Adjust glass glare effect dynamically
                el.style.setProperty('--x', `${x}px`);
                el.style.setProperty('--y', `${y}px`);
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }
});
