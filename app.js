document.addEventListener("DOMContentLoaded", function () {
    // Initialize all modules
    initNavigation();
    initVideoPlayer();
    initHeroBackground();
    initPerformanceFiltering();
    initScrollEffects();
    initInteractiveElements();
    initMembershipTiers();
});

// 1. Navigation System
function initNavigation() {
    const nav = document.querySelector(".nav-overlay");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Scroll effect for navigation bar
    let lastScrollY = window.scrollY;
    function updateNavigation() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }

        // Hide nav on scroll down, show on scroll up for better UX
        if (scrollY > lastScrollY && scrollY > 200) {
            nav.style.transform = "translateY(-100%)";
        } else {
            nav.style.transform = "translateY(0)";
        }
        lastScrollY = scrollY;
    }
    window.addEventListener("scroll", debounce(updateNavigation, 10));

    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            this.classList.toggle("active");
            document.body.style.overflow = navMenu.classList.contains("active")
                ? "hidden"
                : "auto";
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu on link click
                navMenu.classList.remove("active");
                mobileMenuBtn.classList.remove("active");
                document.body.style.overflow = "auto";

                // Update active link style
                navLinks.forEach((l) => l.classList.remove("active"));
                this.classList.add("active");

                // Scroll to section
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    });

    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section[id]");
        const scrollPos = window.scrollY + nav.offsetHeight + 50;
        sections.forEach((section) => {
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${section.getAttribute("id")}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    window.addEventListener("scroll", debounce(updateActiveNavLink, 100));
}

// 2. Video Player Controls (Simplified & Corrected)
function initVideoPlayer() {
    const playPauseBtn = document.querySelector(".play-pause-btn");
    const muteBtn = document.querySelector(".mute-btn");
    const video = document.querySelector(".hero-video-element");

    if (!video) return;

    // Set initial button states based on actual video properties
    playPauseBtn.setAttribute("data-playing", !video.paused);
    muteBtn.setAttribute("data-muted", video.muted);

    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        this.setAttribute("data-playing", !video.paused);
    });

    muteBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        this.setAttribute("data-muted", video.muted);
    });
}

// 3. Hero Background Image Fallback
function initHeroBackground() {
    const videoBackground = document.querySelector(".video-background");
    if (videoBackground) {
        // This provides a static image background in case the video fails to load
        videoBackground.style.backgroundImage = `url('https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1920&h=1080&fit=crop')`;
        videoBackground.style.backgroundPosition = "center";
        videoBackground.style.backgroundSize = "cover";
    }
}

// 4. Performance Filtering System
function initPerformanceFiltering() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const performanceCards = document.querySelectorAll(".performance-card");

    if (!filterBtns.length) return;

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");

            // Update button styles
            filterBtns.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");

            // Show/hide cards
            performanceCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                const shouldShow = filter === "all" || category === filter;
                if (shouldShow) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}

// 5. Scroll Effects and Animations
function initScrollEffects() {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        ".performance-card, .program-card, .tier-card, .section-header"
    );
    elementsToAnimate.forEach((el) => observer.observe(el));
}

// 6. Interactive Elements (Modals)
function initInteractiveElements() {
    document.body.addEventListener("click", function (e) {
        if (e.target.matches(".play-btn")) {
            e.preventDefault();
            const card = e.target.closest(".performance-card");
            const title = card.querySelector("h3")?.textContent || "Performance";
            showVideoModal(title);
        }
        if (e.target.matches(".enroll-btn")) {
            const card = e.target.closest(".program-card");
            const title = card.querySelector(".program-title")?.textContent || "Program";
            showEnrollmentModal(title);
        }
    });
}

// 7. Membership Tiers
function initMembershipTiers() {
    const tierButtons = document.querySelectorAll(".tier-btn");
    tierButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const tierCard = this.closest(".tier-card");
            const tierName = tierCard.querySelector(".tier-name")?.textContent || "Membership";
            const tierPrice = tierCard.querySelector(".tier-price")?.textContent || "₹0";
            showMembershipModal(tierName, tierPrice);
        });
    });
}

// --- Helper & Utility Functions ---

function showVideoModal(title) {
    alert(`Playing video for: ${title}`);
}
function showEnrollmentModal(programTitle) {
    alert(`Opening enrollment for: ${programTitle}`);
}
function showMembershipModal(tierName, tierPrice) {
    alert(`You chose the ${tierName} plan for ${tierPrice}`);
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}