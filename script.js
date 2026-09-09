var themeToggle = document.getElementById('theme-toggle');
var root = document.documentElement;

function getPreferredTheme() {
    var saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    syncDrawerTheme(theme);
}

function toggleTheme() {
    var currentTheme = root.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

function syncDrawerTheme(theme) {
    var drawerSwitch = document.getElementById('drawerThemeSwitch');
    if (!drawerSwitch) return;
    if (theme === 'dark') {
        drawerSwitch.classList.add('active');
        drawerSwitch.setAttribute('aria-label', 'Switch to light mode');
        var label = drawerSwitch.closest('.drawer-theme-row');
        if (label) {
            var lbl = label.querySelector('.drawer-theme-label');
            if (lbl) lbl.textContent = 'Light Mode';
        }
    } else {
        drawerSwitch.classList.remove('active');
        drawerSwitch.setAttribute('aria-label', 'Switch to dark mode');
        var label = drawerSwitch.closest('.drawer-theme-row');
        if (label) {
            var lbl = label.querySelector('.drawer-theme-label');
            if (lbl) lbl.textContent = 'Dark Mode';
        }
    }
}

(function () {
    applyTheme(getPreferredTheme());
})();

themeToggle.addEventListener('click', toggleTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

/* ---- Mobile Drawer ---- */
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');
var mobileOverlay = document.getElementById('mobile-overlay');
var drawerClose = document.getElementById('drawerClose');
var drawerThemeSwitch = document.getElementById('drawerThemeSwitch');

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

hamburger.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', closeMenu);

if (drawerClose) {
    drawerClose.addEventListener('click', closeMenu);
}

if (drawerThemeSwitch) {
    drawerThemeSwitch.addEventListener('click', toggleTheme);
}

/* Close drawer when a nav link is clicked */
var navItems = navLinks.querySelectorAll('.drawer-nav-item a');
navItems.forEach(function (item) {
    item.addEventListener('click', function () {
        closeMenu();
    });
});

/* ESC closes the drawer */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        hamburger.focus();
    }
});

/* ---- Active Section Tracking ---- */
var sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'certificates', 'contact'];

function setActiveSection(id) {
    sectionIds.forEach(function (sid) {
        var link = navLinks.querySelector('a[href="#' + sid + '"]');
        if (link) {
            if (sid === id) {
                link.classList.add('active-section');
            } else {
                link.classList.remove('active-section');
            }
        }
    });
}

if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sectionIds.forEach(function (sid) {
        var section = document.getElementById(sid);
        if (section) observer.observe(section);
    });
}

/* ---- Resume Modal ---- */
var resumeBtn = document.getElementById('resumeBtn');
var resumeModal = document.getElementById('resumeModal');
var resumeModalClose = document.getElementById('resumeModalClose');
var resumeModalOverlay = document.getElementById('resumeModalOverlay');

function openResumeModal(e) {
    e.preventDefault();
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
}

resumeBtn.addEventListener('click', openResumeModal);
resumeModalClose.addEventListener('click', closeResumeModal);
resumeModalOverlay.addEventListener('click', closeResumeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});
