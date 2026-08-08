document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Retro Boot-up Preloader ---
    const preloader = document.getElementById('preloader');
    const bootTextElement = document.getElementById('boot-text');
    const bootMessages = [
        "INITIALIZING SYSTEM...",
        "LOADING NEURAL NETWORKS...",
        "ESTABLISHING SECURE CONNECTION...",
        "ACCESS GRANTED."
    ];

    let messageIndex = 0;
    
    function typeBootMessage() {
        if (messageIndex < bootMessages.length) {
            bootTextElement.innerText = bootMessages[messageIndex];
            messageIndex++;
            setTimeout(typeBootMessage, 400); // 400ms per message
        } else {
            // Finished loading messages, fade out preloader
            setTimeout(() => {
                preloader.classList.add('hide-preloader');
                // Optional: remove from DOM after transition
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 300);
        }
    }
    
    // Start typing boot sequence
    if(preloader && bootTextElement) {
        setTimeout(typeBootMessage, 300);
    }

    // --- 1. Advanced Custom Cursor & Magnetic Elements ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only run custom cursor logic if not on a touch device
    if(window.matchMedia("(pointer: fine)").matches) {
        
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate update for the dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Spring physics loop for the outline
        function animateCursor() {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX += distX * 0.15; // easing factor
            outlineY += distY * 0.15;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover & Magnetic effect on interactable elements
        const magneticElements = document.querySelectorAll('.btn, .social-icon, .nav-link, .menu-icon');
        
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', (e) => {
                cursorOutline.classList.remove('hover');
                // Reset magnetic transform
                el.style.transform = '';
            });
            
            // Magnetic effect logic
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                
                // Calculate distance from center
                const distanceX = e.clientX - elementCenterX;
                const distanceY = e.clientY - elementCenterY;
                
                // Apply a slight pull (adjust 0.3 for strength)
                const pullStrength = el.classList.contains('nav-link') ? 0.2 : 0.3;
                el.style.transform = `translate(${distanceX * pullStrength}px, ${distanceY * pullStrength}px)`;
            });
        });
        
        // General hover for other links (just cursor change, no magnetic)
        const generalLinks = document.querySelectorAll('a:not(.btn):not(.social-icon):not(.nav-link)');
        generalLinks.forEach(link => {
            link.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            link.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
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

    // --- 2.5 Random Glitch Effect on Title ---
    const glitchTitle = document.querySelector('.glitch-effect');
    if (glitchTitle) {
        setInterval(() => {
            glitchTitle.style.animation = 'none';
            // force reflow
            void glitchTitle.offsetWidth;
            glitchTitle.style.animation = null;
            
            // Randomly toggle the class for unpredictable glitches
            if (Math.random() > 0.5) {
                glitchTitle.classList.remove('glitch-effect');
                setTimeout(() => {
                    glitchTitle.classList.add('glitch-effect');
                }, Math.random() * 500 + 100);
            }
        }, 3000);
    }

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

    // --- 7. 3D Spiral Carousel ---
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel3d = document.querySelector('.carousel-3d');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    if (carousel3d && carouselItems.length > 0) {
        const numItems = carouselItems.length;
        const theta = 360 / numItems;
        const itemWidth = 320;
        const radius = Math.round((itemWidth / 2) / Math.tan(Math.PI / numItems)) + 70; // 70px extra spacing
        
        const yPerDegree = 2.5; // Steepness of the spiral (increased for larger amplitude)

        // We will position items dynamically in updateCarousel
        
        let currentAngle = 0;
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        
        const descIcon = document.querySelector('#desc-icon i');
        const descTitle = document.getElementById('desc-title');
        const descSubtitle = document.getElementById('desc-subtitle');
        const descText = document.getElementById('desc-text');
        const descTech = document.getElementById('desc-tech');
        const dynamicDesc = document.getElementById('dynamic-desc');
        let lastActiveIndex = -1;

        function updateCarousel(instant = false) {
            carousel3d.style.transition = instant ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            carousel3d.style.transform = `translateZ(${-radius}px) rotateY(${currentAngle}deg)`;
            
            // Highlight front-most item
            let normalizedAngle = currentAngle % 360;
            if (normalizedAngle <= 0) normalizedAngle += 360; // handle negative modulo
            
            let activeIndex = Math.round((360 - normalizedAngle) / theta) % numItems;
            if (activeIndex === numItems) activeIndex = 0;
            
            carouselItems.forEach((item, index) => {
                const itemAngle = theta * index;
                
                // Calculate relative angle to front
                let faceAngle = (itemAngle + currentAngle) % 360;
                if (faceAngle > 180) faceAngle -= 360;
                else if (faceAngle < -180) faceAngle += 360;
                
                // Spiral Y offset
                const itemY = faceAngle * yPerDegree;
                
                item.style.transition = instant ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s, box-shadow 0.3s';
                item.style.transform = `translateY(calc(-50% + ${itemY}px)) rotateY(${itemAngle}deg) translateZ(${radius}px)`;

                if (index === activeIndex) {
                    item.classList.add('active-card');
                    
                    // Update left description panel if changed
                    if (lastActiveIndex !== index && dynamicDesc) {
                        lastActiveIndex = index;
                        // Reset animation for visual pop
                        dynamicDesc.style.animation = 'none';
                        dynamicDesc.offsetHeight; 
                        dynamicDesc.style.animation = 'fadeInDesc 0.5s ease-out';
                        
                        if (descIcon) descIcon.className = 'bx ' + item.getAttribute('data-icon');
                        if (descTitle) descTitle.textContent = item.getAttribute('data-title');
                        if (descSubtitle) descSubtitle.textContent = item.getAttribute('data-subtitle');
                        if (descText) descText.textContent = item.getAttribute('data-text');
                        
                        if (descTech) {
                            const techs = item.getAttribute('data-tech').split(',');
                            descTech.innerHTML = '';
                            techs.forEach(tech => {
                                const span = document.createElement('span');
                                span.textContent = tech;
                                descTech.appendChild(span);
                            });
                        }
                    }
                } else {
                    item.classList.remove('active-card');
                }
            });
        }
        
        // Initial setup
        updateCarousel(true);
        
        // Drag events for mouse
        carouselContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });
        
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                currentAngle = Math.round(currentAngle / theta) * theta;
                updateCarousel();
            }
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
            const diffX = currentX - startX;
            currentAngle += diffX * 0.4;
            startX = currentX;
            updateCarousel(true);
        });

        // Touch support
        carouselContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
        }, {passive: true});
        
        window.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                currentAngle = Math.round(currentAngle / theta) * theta;
                updateCarousel();
            }
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            currentAngle += diffX * 0.5;
            startX = currentX;
            updateCarousel(true);
        }, {passive: true});
    }

    // --- Wind Animation for Pixel Background ---
    function initWindAnimation() {
        const bgContainer = document.querySelector('.background-elements');
        if (!bgContainer) return;
        
        const numParticles = 40;
        for (let i = 0; i < numParticles; i++) {
            createParticle(bgContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('wind-particle');
        
        // Randomize properties for a natural wind effect
        const startY = Math.random() * 100; // start anywhere on Y axis
        const startX = 100 + Math.random() * 20; // start off-screen right
        const duration = 5 + Math.random() * 10; // 5s to 15s duration
        const delay = Math.random() * 10; // random delay
        const opacity = 0.2 + Math.random() * 0.6; // random opacity
        const size = Math.random() > 0.8 ? 3 : 2; // mostly 2px, some 3px
        
        particle.style.top = `${startY}%`;
        particle.style.left = `${startX}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
        
        // When animation ends, recreate it for infinite loop
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle(container);
        });
    }

    initWindAnimation();

    // --- SVG Ripple Animation for Water/Grass ---
    const turbulence = document.getElementById('turbulence');
    if (turbulence) {
        let frame = 0;
        function animateRipple() {
            frame += 0.005; // Speed of the ripple
            // Oscillate the X and Y frequencies slightly to create a breathing, swaying effect
            const freqX = 0.01 + Math.sin(frame) * 0.003;
            const freqY = 0.05 + Math.cos(frame) * 0.005;
            turbulence.setAttribute('baseFrequency', `${freqX} ${freqY}`);
            requestAnimationFrame(animateRipple);
        }
        animateRipple();
    }

    // --- Full Site Pixel Starfield Generation ---
    function generateStars(elementId, count, color) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let boxShadow = "";
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 3000);
            const y = Math.floor(Math.random() * 3000);
            
            let opacity = Math.random() * 0.8 + 0.2;
            let starColor = color;
            
            if (color === '#FFF' && Math.random() > 0.7) {
                starColor = '#00f0ff';
                opacity = opacity * 0.5;
            }

            boxShadow += `${x}px ${y}px ${starColor}`;
            if (i < count - 1) {
                boxShadow += ", ";
            }
        }
        element.style.boxShadow = boxShadow;
    }

    // Generate 3 layers of stars
    generateStars("stars", 700, "#FFF");
    generateStars("stars2", 200, "#FFF");
    generateStars("stars3", 100, "#FFF");

    // --- Certificate Image Modal Logic ---
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const certLinks = document.querySelectorAll('.clickable-card');

    // Add error handler for broken images
    if (modalImg) {
        modalImg.addEventListener('error', function() {
            // Ignore errors caused by clearing the src or empty src
            if (!this.getAttribute('src')) return;
            
            alert(`图片加载失败！请确保你在 Image/ 文件夹里有一个对应的图片。`);
            if (modal) modal.classList.remove('show');
        });
    }

    // Open modal on link click
    certLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const imageSrc = this.getAttribute('data-image');
            
            // If the link has an image assigned, intercept the click and open modal
            if (imageSrc && modal && modalImg) {
                e.preventDefault(); // Stop from opening new tab immediately
                modalImg.src = imageSrc;
                modal.classList.add('show');
            }
        });
    });

    // Close modal on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modalImg.removeAttribute('src'), 300);
        });
    }

    // Close modal when clicking outside the image
    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modalImg.removeAttribute('src'), 300);
        }
    });

    // Close modal on ESC key
    window.addEventListener('keydown', (e) => {
        if (modal && e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            setTimeout(() => modalImg.removeAttribute('src'), 300);
        }
    });

});
