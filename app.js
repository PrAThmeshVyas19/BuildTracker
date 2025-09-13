// Darbar Kala Kendra - Premium Interactive Experience
// Video-first cultural foundation website
// Update your DOMContentLoaded event listener
// Darbar Kala Kendra - Premium Interactive Experience
// Video-first cultural foundation website
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initNavigation();
    initVideoPlayer();
    initHeroBackground();
    initPerformanceFiltering();
    initScrollEffects();
    initInteractiveElements();
    initMembershipTiers();
    initEventBooking();
    initAcademyPrograms();
    initGalleryModal();
    initAnimations();
    initAccessibility();
});


// Navigation System
function initNavigation() {
    const nav = document.querySelector('.nav-overlay');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navigation
    let lastScrollY = window.scrollY;

    function updateNavigation() {
        const scrollY = window.scrollY;

        if (scrollY > 50) { // Add scrolled class sooner
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide nav on scroll down, show on scroll up
        if (scrollY > lastScrollY && scrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', debounce(updateNavigation, 10));

    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

// **FIXED** Video Player Controls
function initVideoPlayer() {
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const muteBtn = document.querySelector('.mute-btn');
    const video = document.querySelector('.hero-video-element');

    if (!video) return; // Exit if video element doesn't exist

    // Set initial button states based on actual video properties
    let isPlaying = !video.paused;
    let isMuted = video.muted;

    playPauseBtn.setAttribute('data-playing', isPlaying);
    muteBtn.setAttribute('data-muted', isMuted);

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function () {
            isPlaying = !video.paused; // Check the actual state
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            isPlaying = !video.paused;
            this.setAttribute('data-playing', isPlaying);
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', function () {
            isMuted = !video.muted;
            video.muted = !isMuted; // Toggle the muted property
            this.setAttribute('data-muted', video.muted);
        });
    }
}


// **FIXED** Hero Background Fallback
function initHeroBackground() {
    const videoBackground = document.querySelector('.video-background'); // Correct selector
    if (videoBackground) {
        const heroImage = new Image();
        heroImage.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1920&h=1080&fit=crop";
        heroImage.onload = () => {
            videoBackground.style.backgroundImage = `url(${heroImage.src})`;
            videoBackground.style.backgroundPosition = 'center';
            videoBackground.style.backgroundSize = 'cover';
        };
    }
}

// Performance Filtering System (Unchanged)
function initPerformanceFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const performanceCards = document.querySelectorAll('.performance-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            performanceCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                setTimeout(() => {
                    if (shouldShow) {
                        card.classList.remove('hidden');
                        card.style.animation = `fadeInUp 0.5s ease forwards`;
                    } else {
                        card.classList.add('hidden');
                    }
                }, index * 50);
            });
        });
    });
}

// Scroll Effects and Animations (Unchanged)
function initScrollEffects() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('performance-card') ||
                    entry.target.classList.contains('artist-card') ||
                    entry.target.classList.contains('experience-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.performance-card, .artist-card, .program-card, .event-card, .experience-card, .tier-card, .section-header');
    elementsToAnimate.forEach(el => observer.observe(el));
}


// Interactive Elements (Unchanged)
function initInteractiveElements() {
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.performance-card, .experience-card');
            const title = card.querySelector('h3')?.textContent || 'Performance';
            showVideoModal(title);
        });
    });
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const programTitle = this.closest('.program-card').querySelector('.program-title')?.textContent || 'Program';
            showEnrollmentModal(programTitle);
        });
    });
}

// Membership Tiers (Unchanged)
function initMembershipTiers() {
    const tierButtons = document.querySelectorAll('.tier-btn');
    tierButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const tierCard = this.closest('.tier-card');
            const tierName = tierCard.querySelector('.tier-name')?.textContent || 'Membership';
            const tierPrice = tierCard.querySelector('.tier-price')?.textContent || '£0';
            this.classList.add('loading');
            this.textContent = 'Processing...';
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = 'Choose Plan';
                showMembershipModal(tierName, tierPrice);
            }, 1500);
        });
    });
}

// The rest of the JS functions (initEventBooking, initAcademyPrograms, etc.) remain unchanged as they were not affected by the UI modernization.
function initEventBooking() {
    const bookBtns = document.querySelectorAll('.book-btn');
    bookBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title')?.textContent || 'Event';
            showBookingModal(eventTitle);
        });
    });
}
function initAcademyPrograms() { }
function initGalleryModal() { }
function initAnimations() { }
function initAccessibility() { }
function showVideoModal(title) { alert(`Playing video for: ${title}`); }
function showEnrollmentModal(programTitle) { alert(`Opening enrollment for: ${programTitle}`); }
function showMembershipModal(tierName, tierPrice) { alert(`You chose the ${tierName} plan for ${tierPrice}`); }
function showBookingModal(eventTitle) { alert(`Booking tickets for: ${eventTitle}`); }
function debounce(func, delay) { let timeoutId; return function (...args) { clearTimeout(timeoutId); timeoutId = setTimeout(() => { func.apply(this, args); }, delay); }; }

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initNavigation();
    initVideoPlayer();
    initHeroBackground(); // Add this line
    initPerformanceFiltering();
    initScrollEffects();
    initInteractiveElements();
    initMembershipTiers();
    initEventBooking();
    initAcademyPrograms();
    initGalleryModal();
    initAnimations();
    initAccessibility();
});


// Navigation System
function initNavigation() {
    const nav = document.querySelector('.nav-overlay');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navigation
    let lastScrollY = window.scrollY;

    function updateNavigation() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide nav on scroll down, show on scroll up
        if (scrollY > lastScrollY && scrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', debounce(updateNavigation, 10));

    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Smooth scroll to target
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

// Video Player Controls
function initVideoPlayer() {
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const muteBtn = document.querySelector('.mute-btn');
    const videoBackground = document.querySelector('.video-content');

    let isPlaying = true;
    let isMuted = false;

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function () {
            isPlaying = !isPlaying;
            this.setAttribute('data-playing', isPlaying);

            // Visual feedback for play/pause
            if (isPlaying) {
                videoBackground.style.animationPlayState = 'running';
                showNotification('Video resumed', 'info');
            } else {
                videoBackground.style.animationPlayState = 'paused';
                showNotification('Video paused', 'info');
            }
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', function () {
            isMuted = !isMuted;
            this.setAttribute('data-muted', isMuted);

            showNotification(isMuted ? 'Audio muted' : 'Audio enabled', 'info');
        });
    }

    // Auto-pause video on mobile for performance
    if (window.innerWidth <= 768) {
        if (playPauseBtn) {
            playPauseBtn.click();
        }
    }

}

// Add this new function after initVideoPlayer()
function initHeroBackground() {
    const videoContent = document.querySelector('.video-content');
    if (videoContent) {
        const heroImage = new Image();
        heroImage.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1920&h=1080&fit=crop";
        heroImage.onload = () => {
            videoContent.style.background = `url(${heroImage.src}) center/cover no-repeat`;
        };
    }
}

// Performance Filtering System
function initPerformanceFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const performanceCards = document.querySelectorAll('.performance-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter performance cards with animation
            performanceCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                setTimeout(() => {
                    if (shouldShow) {
                        card.classList.remove('hidden');
                        card.style.animation = `fadeInUp 0.5s ease forwards`;
                    } else {
                        card.classList.add('hidden');
                    }
                }, index * 50);
            });

            // Update results count
            const visibleCards = Array.from(performanceCards).filter(card =>
                !card.classList.contains('hidden')
            ).length;

            showNotification(`Showing ${visibleCards} performances`, 'success');
        });
    });
}

// Scroll Effects and Animations
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Stagger animations for grid items
                if (entry.target.classList.contains('performance-card') ||
                    entry.target.classList.contains('artist-card') ||
                    entry.target.classList.contains('experience-card')) {

                    const delay = Array.from(entry.target.parentNode.children)
                        .indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .performance-card,
        .artist-card,
        .program-card,
        .event-card,
        .experience-card,
        .tier-card,
        .section-header
    `);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    // const heroVideo = document.querySelector('.hero-video');
    // if (heroVideo) {
    //     window.addEventListener('scroll', debounce(() => {
    //         const scrolled = window.pageYOffset;
    //         const parallax = scrolled * 0.5;
    //         heroVideo.style.transform = `translateY(${parallax}px)`;
    //     }, 16));
    // }

    // Counter animation for statistics
    animateCounters();
}

// Interactive Elements
function initInteractiveElements() {
    // Play buttons for performance cards
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.performance-card, .experience-card');
            const title = card.querySelector('h3')?.textContent || 'Performance';

            // Simulate video player opening
            showVideoModal(title);
        });
    });

    // Preview buttons for artists
    const previewButtons = document.querySelectorAll('.preview-btn');
    previewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.artist-card, .event-card');
            const title = card.querySelector('h3, .event-title')?.textContent || 'Preview';
            showVideoModal(title);
        });
    });

    // Video play buttons in academy section
    const videoPlayBtns = document.querySelectorAll('.video-play-btn');
    videoPlayBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.program-card');
            const title = card.querySelector('.program-title')?.textContent || 'Program';
            showVideoModal(title);
        });
    });

    // Enroll buttons
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const programTitle = this.closest('.program-card')
                .querySelector('.program-title')?.textContent || 'Program';
            showEnrollmentModal(programTitle);
        });
    });
}

// Membership Tiers
function initMembershipTiers() {
    const tierCards = document.querySelectorAll('.tier-card');
    const tierButtons = document.querySelectorAll('.tier-btn');
    tierButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const tierCard = this.closest('.tier-card');
            const tierName = tierCard.querySelector('.tier-name')?.textContent || 'Membership';
            const tierPrice = tierCard.querySelector('.tier-price')?.textContent || '£0';
            // Add loading state
            this.classList.add('loading');
            this.textContent = 'Processing...';
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = 'Choose Plan';
                showMembershipModal(tierName, tierPrice);
            }, 1500);
        });
    });

    // Highlight featured tier
    const featuredTier = document.querySelector('.tier-card.featured');
    if (featuredTier) {
        setInterval(() => {
            featuredTier.style.boxShadow = '0 20px 60px rgba(201, 169, 110, 0.4)';
            setTimeout(() => {
                featuredTier.style.boxShadow = '';
            }, 2000);
        }, 8000);
    }
}

// Event Booking
function initEventBooking() {
    const bookBtns = document.querySelectorAll('.book-btn');
    bookBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title')?.textContent || 'Event';
            showBookingModal(eventTitle);
        });
    });
}

// Academy Programs
function initAcademyPrograms() {
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        const img = card.querySelector('.program-img');
        if (img) {
            img.onload = () => {
                card.classList.add('loaded');
            };
        }
    });
}

// Gallery Modal
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal .close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImage.src = this.querySelector('img').src;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


// Shared utility functions
function showNotification(message, type = 'info', duration = 3000) {
    const notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, duration);
}

function showVideoModal(title) {
    alert(`Playing video for: ${title}`);
    // In a real app, this would open a video player modal
}

function showEnrollmentModal(programTitle) {
    alert(`Opening enrollment for: ${programTitle}`);
    // In a real app, this would open a form or modal for enrollment
}

function showMembershipModal(tierName, tierPrice) {
    alert(`You chose the ${tierName} plan for ${tierPrice}`);
    // In a real app, this would open a payment or sign-up modal
}

function showBookingModal(eventTitle) {
    alert(`Booking tickets for: ${eventTitle}`);
    // In a real app, this would open an event booking modal
}


// Debounce function to limit the rate of function calls
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-value'), 10);
                let count = 0;
                const increment = Math.ceil(value / 100); // 100 steps
                const speed = 15; // Animation speed in ms

                const timer = setInterval(() => {
                    count += increment;
                    if (count >= value) {
                        count = value;
                        clearInterval(timer);
                    }
                    target.textContent = count.toLocaleString();
                }, speed);

                observer.unobserve(target); // Stop observing after animation
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1920&h=1080&fit=crop'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Error handling
window.addEventListener('error', function (e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Service worker would be registered here for production
        console.log('Service worker support available');
    });
}