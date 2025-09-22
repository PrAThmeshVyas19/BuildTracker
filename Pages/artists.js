// Artist Gallery JavaScript
// Interactive functionality for the artists page

// Artist gallery data
const artistGalleries = {
    'abha-auti': {
        name: 'Abha Auti',
        specialty: 'Classical Kathak Dancer',
        images: [
            '../images/Artists/Abha_Auti/1.JPG',
            '../images/Artists/Abha_Auti/2.JPG',
            '../images/Artists/Abha_Auti/3.JPG',
            '../images/Artists/Abha_Auti/4.JPG',
            '../images/Artists/Abha_Auti/5.JPG',
            '../images/Artists/Abha_Auti/6.JPG'
        ]
    },
    'dheerendra-tiwari': {
        name: 'Dheerendra Tiwari',
        specialty: 'Classical Kathak Dancer',
        images: [
            '../images/Artists/Dheerendra_Tiwari/1.JPG',
            '../images/Artists/Dheerendra_Tiwari/2.JPG',
            // '../images/Artists/Dheerendra_Tiwari/.JPG',
            // '../images/Artists/Dheerendra_Tiwari/.JPG',
            // '../images/Artists/Dheerendra_Tiwari/.JPG'
        ]
    },
    'vaibhav-arekar': {
        name: 'Vaibhav Arekar',
        specialty: 'Classical Kathak Dancer',
        images: [
            '../images/Artists/Vaibhav_Arekar/1.JPG',
            '../images/Artists/Vaibhav_Arekar/2.JPG',
            '../images/Artists/Vaibhav_Arekar/3.JPG',
            '../images/Artists/Vaibhav_Arekar/4.webp',
        ]
    },
    'swapna-datar': {
        name: 'Swapna Datar',
        specialty: 'Violinist Maestra',
        images: [
            '../images/Artists/Swapna_Datar/1.JPG',
            '../images/Artists/Swapna_Datar/2.JPG',
            '../images/Artists/Swapna_Datar/3.JPG',
            '../images/Artists/Swapna_Datar/4.JPG',
            '../images/Artists/Swapna_Datar/5.JPG',
            '../images/Artists/Swapna_Datar/6.JPG',
        ]
    },
    'rakesh-bapat': {
        name: 'Rakesh Bapat',
        specialty: 'Actor and Murtikar',
        images: [
            '../images/Artists/Rakesh_Bapat/1.JPG',
            // './images/kavita-gallery2.jpg',
            // './images/kavita-gallery3.jpg',
            // './images/kavita-gallery4.jpg'
        ]
    },
    'shruti-marathe': {
        name: 'Shruti Marathe',
        specialty: 'Actor and Vadak',
        images: [
            '../images/Artists/Shruti_Marathe/1.JPG',
            '../images/Artists/Shruti_Marathe/2.JPG',
            '../images/Artists/Shruti_Marathe/3.JPG',
            // './images/vikram-gallery4.jpg',
            // './images/vikram-gallery5.jpg'
        ]
    }
};

// Function to open gallery modal
function openGallery(artistId) {
    const artist = artistGalleries[artistId];
    if (!artist) return;

    // Set artist information
    document.getElementById('modal-artist-name').textContent = artist.name;
    document.getElementById('modal-artist-specialty').textContent = artist.specialty;

    // Clear and populate gallery
    const galleryContainer = document.getElementById('modal-gallery');
    galleryContainer.innerHTML = '';

    artist.images.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'modal-gallery-item';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${artist.name} - Image ${index + 1}`;
        img.loading = 'lazy';

        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
    });

    // Show modal
    const modal = document.getElementById('gallery-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close gallery modal
function closeGallery() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content
document.getElementById('gallery-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeGallery();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeGallery();
    }
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Add any initialization code here
    console.log('Artists page loaded successfully');
});