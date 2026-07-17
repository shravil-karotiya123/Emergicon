/**
 * EMERGICON Forum Installation Ceremony Invitation
 * Official Script - Premium Motion & Visual Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Systems
    initLoader();
    initCanvasParticles();
    initMouseFollower();
    initScrollReveal();
    initScrollProgress();
});

/* ==========================================================================
   1. LOADER & HERO ENTRANCE SYSTEM
   ========================================================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    const heroLogo = document.getElementById('hero-logo-wrapper');
    const textLines = document.querySelectorAll('.reveal-text-line');
    const scrollBtn = document.getElementById('hero-scroll-btn');

    // Simulate luxury booting loading sequence
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Fade out loader screen
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';

            // Start Cinematic Landing Animations after loader fades
            setTimeout(() => {
                // 1. Fade + scale in EMERGICON logo
                if (heroLogo) heroLogo.classList.add('active');

                // 2. Animate each text line one-by-one with staggered delay
                textLines.forEach((line) => {
                    line.classList.add('active');
                });

                // 3. Reveal scroll button after text lines have animated in
                setTimeout(() => {
                    if (scrollBtn) scrollBtn.classList.add('active');
                }, 3800); // Placed slightly after the text animations start (staggered up to 3.6s)

            }, 800); // Short delay after loader starts fading

        }, 1200); // Simulated loading time
    });
}

/* ==========================================================================
   2. HIGH-PERFORMANCE CANVAS BACKGROUND SYSTEM
   ========================================================================== */
function initCanvasParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Configuration
    const particleCount = Math.min(75, Math.floor((width * height) / 18000)); // Dynamic count based on screen size
    const particles = [];
    
    // Light Streaks Configuration
    const streakCount = 3;
    const streaks = [];

    // Mesh Gradient Center Coordinates (for smooth movement)
    let meshBlueX = width * 0.3;
    let meshBlueY = height * 0.7;
    let meshWhiteX = width * 0.7;
    let meshWhiteY = height * 0.3;
    let time = 0;

    // Handle Window Resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Particle Constructor
    class Particle {
        constructor() {
            this.reset();
            // Start at random coordinates initially
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + 10;
            this.size = Math.random() * 1.8 + 0.6;
            this.speedY = -(Math.random() * 0.35 + 0.15); // Upward float
            this.speedX = Math.random() * 0.2 - 0.1;      // Tiny drift
            this.opacity = Math.random() * 0.5 + 0.15;
            this.maxOpacity = this.opacity;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            // Fade particles out as they approach the top 15% of the screen
            if (this.y < height * 0.15) {
                this.opacity -= this.fadeSpeed;
            }

            // Reset when completely faded or out of view
            if (this.y < -10 || this.opacity <= 0 || this.x < -10 || this.x > width + 10) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.shadowBlur = this.size * 3;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for performance
        }
    }

    // Light Streak Constructor (creates organic floating beams)
    class LightStreak {
        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + 100;
            this.length = Math.random() * 150 + 80;
            this.width = Math.random() * 2.5 + 1.2;
            this.speedY = -(Math.random() * 0.8 + 0.4);
            this.speedX = -(Math.random() * 0.2 + 0.1);
            this.opacity = Math.random() * 0.08 + 0.02;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            if (this.y < -this.length) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.length * 0.3, this.y + this.length);
            grad.addColorStop(0, 'rgba(79, 195, 247, 0)');
            grad.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity})`);
            grad.addColorStop(1, 'rgba(79, 195, 247, 0)');

            ctx.strokeStyle = grad;
            ctx.lineWidth = this.width;
            ctx.lineCap = 'round';
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - 20, this.y + this.length);
            ctx.stroke();
        }
    }

    // Initialize Particles and Streaks
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    for (let i = 0; i < streakCount; i++) {
        streaks.push(new LightStreak());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Mesh Gradient Background (Buttery Smooth Tesla Backdrop)
        time += 0.0015;
        
        // Calculate moving coordinates for mesh gradients
        meshBlueX = width * 0.5 + Math.sin(time) * width * 0.25;
        meshBlueY = height * 0.5 + Math.cos(time * 1.2) * height * 0.25;
        
        meshWhiteX = width * 0.5 + Math.cos(time * 0.8) * width * 0.25;
        meshWhiteY = height * 0.5 + Math.sin(time * 1.5) * height * 0.25;

        // Draw Deep Ambient Black Backing
        ctx.fillStyle = '#030303';
        ctx.fillRect(0, 0, width, height);

        // Blue glow gradient (#4FC3F7)
        const blueGlow = ctx.createRadialGradient(meshBlueX, meshBlueY, 10, meshBlueX, meshBlueY, Math.max(width, height) * 0.7);
        blueGlow.addColorStop(0, 'rgba(79, 195, 247, 0.038)');
        blueGlow.addColorStop(0.5, 'rgba(79, 195, 247, 0.015)');
        blueGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = blueGlow;
        ctx.fillRect(0, 0, width, height);

        // Silver-white luxury gradient
        const whiteGlow = ctx.createRadialGradient(meshWhiteX, meshWhiteY, 10, meshWhiteX, meshWhiteY, Math.max(width, height) * 0.65);
        whiteGlow.addColorStop(0, 'rgba(255, 255, 255, 0.025)');
        whiteGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.008)');
        whiteGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = whiteGlow;
        ctx.fillRect(0, 0, width, height);

        // 2. Draw Streaks
        streaks.forEach((streak) => {
            streak.update();
            streak.draw();
        });

        // 3. Draw Particles
        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   3. PREMIUM SMOOTH CURSOR & INTERACTION SYSTEM
   ========================================================================== */
function initMouseFollower() {
    const follower = document.getElementById('cursor-follower');
    if (!follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Track mouse coordinate targets
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Lerp (Linear Interpolation) loop for smooth cursor follower lag
    function updateFollower() {
        // Lerp equation: current = current + (target - current) * factor
        // 0.08 factor creates a heavy, elegant, high-fidelity drag effect
        followerX += (mouseX - followerX) * 0.085;
        followerY += (mouseY - followerY) * 0.085;

        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(updateFollower);
    }
    updateFollower();

    // Interaction Hover listeners
    const hoverTargets = document.querySelectorAll('button, a, .leadership-card, .highlight-card, .footer-logo-wrapper');

    hoverTargets.forEach((target) => {
        target.addEventListener('mouseenter', () => {
            follower.classList.add('hovered');
        });
        target.addEventListener('mouseleave', () => {
            follower.classList.remove('hovered');
        });
    });

    // Handle mouse click animations
    window.addEventListener('mousedown', () => {
        follower.classList.add('clicked');
    });
    window.addEventListener('mouseup', () => {
        follower.classList.remove('clicked');
    });

    // Hide custom follower on hover exit / out of focus
    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        follower.style.opacity = '1';
    });
}

/* ==========================================================================
   4. SCROLL REVEAL & INTERSECTION OBSERVER
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it triggers, we don't need to observe it again
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach((el) => {
        observer.observe(el);
    });
}

/* ==========================================================================
   5. PROGRESS SCROLLBAR INDICATOR
   ========================================================================== */
function initScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    if (!progress) return;

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        progress.style.width = `${scrolled}%`;
    });
}

/* ==========================================================================
   6. NAVIGATION METHOD FOR HERO BUTTON
   ========================================================================== */
function scrollToLeadership() {
    const targetSection = document.getElementById('leadership');
    if (targetSection) {
        // Custom smooth scroll offset
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
