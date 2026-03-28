/* ============ NAVBAR SCROLL SHRINK ============ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ============ MOBILE MENU TOGGLE ============ */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

/* ============ ACTIVE NAV LINK ON SCROLL ============ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const sectionTop = sec.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/* ============ FADE IN SECTIONS ON SCROLL ============ */
const fadeElements = document.querySelectorAll('.fade-in-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => sectionObserver.observe(el));

/* ============ EXPERIENCE TABS ============ */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.getElementById('tab-' + tabId).classList.add('active');
    });
});

/* ============ TYPING ANIMATION ============ */
const typedEl = document.getElementById('typed-text');

const phrases = [
    'Desarrollador Backend.',
    'Docente universitario.',
    'Apasionado del software.'
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let delay       = 90;

function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
            isDeleting = true;
            delay = 2200; // pause before deleting
        } else {
            delay = 90;
        }
    } else {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        delay = 50;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }
    }

    setTimeout(type, delay);
}

type();
