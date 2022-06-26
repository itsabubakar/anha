// Navbar
const primaryNav = document.querySelector('.primary-nav');
const navToggle = document.querySelector('.mobile-nav-toggle');

// New Navbar

const open = document.querySelector('.open');
const close = document.querySelector('.close');

open.addEventListener('click', () => {
        primaryNav.setAttribute('data-visible', true)
        navToggle.setAttribute('aria-expanded', true)
        open.classList.add('hidden')
        close.classList.add('show');
})

close.addEventListener('click', () => {
        primaryNav.setAttribute('data-visible', false)
        navToggle.setAttribute('aria-expanded', false)
        open.classList.remove('hidden')
        close.classList.remove('show');
})