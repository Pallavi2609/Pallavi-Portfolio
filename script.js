// Mobile Navbar Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleMenu() {
    if (navLinks.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Toggle on hamburger click
hamburger.addEventListener('click', toggleMenu);

// Close on overlay click
mobileOverlay.addEventListener('click', closeMenu);

// Close when a nav link is clicked
const navItems = navLinks.querySelectorAll('a');
navItems.forEach(function (item) {
    item.addEventListener('click', function () {
        closeMenu();
    });
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        hamburger.focus();
    }
});
