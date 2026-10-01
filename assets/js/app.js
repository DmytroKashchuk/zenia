/* UTV Forge — shared behaviour: navigation, search, fitment finder, FAQ */
document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    /* ---------- Mobile navigation ---------- */
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.site-nav__close');
    const navOverlay = document.querySelector('.nav-overlay');

    const setNav = (open) => {
        body.classList.toggle('nav-open', open);
        navToggle?.setAttribute('aria-expanded', String(open));
    };

    navToggle?.addEventListener('click', () => setNav(!body.classList.contains('nav-open')));
    navClose?.addEventListener('click', () => setNav(false));
    navOverlay?.addEventListener('click', () => setNav(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setNav(false);
            body.classList.remove('search-open');
        }
    });

    // Sub-menu accordions (mobile only; desktop uses hover)
    document.querySelectorAll('.site-nav__toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.has-mega');
            const open = item.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', String(open));
        });
    });

    /* ---------- Mobile search ---------- */
    const searchToggle = document.querySelector('.search-toggle');
    searchToggle?.addEventListener('click', () => {
        const open = body.classList.toggle('search-open');
        if (open) document.querySelector('.site-search--mobile input')?.focus();
    });

    /* ---------- Fitment finder: brand -> model ---------- */
    const brandSel = document.getElementById('finderBrand');
    const modelSel = document.getElementById('finderModel');

    const models = {
        kawasaki: ['KRX 1000', 'KRX4 1000', 'Teryx 4', 'Mule Pro FXT'],
        polaris: ['RZR 1000', 'RZR Pro XP', 'Ranger 1000', 'General 1000'],
        'can-am': ['Maverick X3', 'Defender', 'Commander'],
        honda: ['Talon 1000', 'Pioneer 1000'],
        yamaha: ['YXZ1000R', 'Wolverine RMAX']
    };

    const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    brandSel?.addEventListener('change', () => {
        const list = models[brandSel.value] || [];
        modelSel.innerHTML = '<option value="">All models</option>' +
            list.map((m) => `<option value="${slug(m)}">${m}</option>`).join('');
        modelSel.disabled = list.length === 0;
    });

    /* ---------- FAQ: one open at a time ---------- */
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            faqItems.forEach((other) => { if (other !== item) other.open = false; });
        });
    });

});
