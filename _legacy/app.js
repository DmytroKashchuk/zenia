document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.querySelector('.header__search-btn');
    const searchForm = document.querySelector('.header__search');
    const menuBtn = document.querySelector('.header__menu-btn');
    const menu = document.querySelector('.header__menu');
    const menuList = document.querySelector('.header__menu-list');


    if (!menuBtn || !menu || !menuList) {
        return;
    }


    let depth = 0;


    /* ==============================
       BURGER
    ============================== */

    menuBtn.addEventListener('click', () => {

        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');


        if (!menu.classList.contains('active')) {

            setTimeout(() => {
                resetMenu();
            }, 300);

        }

    });

    if (searchButton && searchForm) {
        searchButton.addEventListener('click', () => {
            searchButton.classList.toggle('active');
            searchForm.classList.toggle('active');
        });
    }


    /* ==============================
       ADD BACK BUTTON
    ============================== */

    const submenus =
        menu.querySelectorAll('.submenu');


    submenus.forEach((submenu) => {

        const parentItem =
            submenu.parentElement;


        const heading =
            parentItem.querySelector(
                ':scope > .menu-item__row > a, ' +
                ':scope > .menu-item__row > .menu-heading'
            );


        const title =
            heading
                ? heading.textContent.trim()
                : 'Menu';


        const backItem =
            document.createElement('li');


        backItem.classList.add(
            'submenu-back-item'
        );


        backItem.innerHTML = `
            <button
                class="submenu-back"
                type="button"
            >
                <span class="submenu-back__arrow">
                    ←
                </span>

                <span class="submenu-back__text">
                    Back
                </span>

                <span class="submenu-back__title">
                    ${title}
                </span>
            </button>
        `;


        submenu.prepend(backItem);

    });


    /* ==============================
       OPEN SUBMENU
    ============================== */

    const toggles =
        menu.querySelectorAll('.submenu-toggle');


    toggles.forEach((toggle) => {

        toggle.addEventListener('click', (event) => {

            event.preventDefault();
            event.stopPropagation();


            const parentItem =
                toggle.closest(
                    '.menu-item-has-children'
                );


            if (!parentItem) return;


            const submenu =
                parentItem.querySelector(
                    ':scope > .submenu'
                );


            if (!submenu) return;


            // Reveal this submenu, then slide the panel one level deeper
            submenu.classList.add('is-open');

            depth++;

            // depth 0 -> translateX(0), depth 1 -> translateX(-100%), ...

            menuList.style.setProperty(
                '--menu-depth',
                depth
            );

        });

    });


    /* ==============================
       BACK
    ============================== */

    menu.addEventListener('click', (event) => {

        const backButton =
            event.target.closest('.submenu-back');


        if (!backButton) return;


        event.preventDefault();


        const currentSubmenu =
            backButton.closest('.submenu');


        if (!currentSubmenu) return;


        // Slide back first
        depth = Math.max(0, depth - 1);


        menuList.style.setProperty(
            '--menu-depth',
            depth
        );


        // Hide the submenu after the slide animation ends
        setTimeout(() => {

            currentSubmenu.classList.remove(
                'is-open'
            );

        }, 400);

    });


    /* ==============================
       RESET
    ============================== */

    function resetMenu() {

        depth = 0;


        menuList.style.setProperty(
            '--menu-depth',
            0
        );


        const openedSubmenus =
            menu.querySelectorAll(
                '.submenu.is-open'
            );


        openedSubmenus.forEach((submenu) => {

            submenu.classList.remove(
                'is-open'
            );

        });

    }


    const searchInput = document.querySelector('#search');
    const resultBox = document.querySelector('.result-box');

    if (searchInput) {

        const openSearch = () => {
            document.body.classList.add('search-is-active');
        };

        const closeSearch = () => {
            document.body.classList.remove('search-is-active');
        };

        searchInput.addEventListener('focus', openSearch);

        // Close when clicking outside the input / result box
        document.addEventListener('click', (event) => {

            const clickedInput = searchInput.contains(event.target);
            const clickedResult = resultBox?.contains(event.target);

            if (!clickedInput && !clickedResult) {
                closeSearch();
            }
        });

        // Escape
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeSearch();
                searchInput.blur();
            }
        });
    }



    
    const searchClear = document.querySelector('#search-clear');

    if (searchInput && searchClear) {
        searchInput.addEventListener('input', () => {
            searchInput.parentElement.classList.toggle(
                'has-value',
                searchInput.value.length > 0
            );
        });

        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.parentElement.classList.remove('has-value');
        });
    }


    /* ==============================
       HOME: CATEGORY SCROLL PROGRESS
    ============================== */

    const categoryGrid = document.querySelector('.category-grid');
    const progressBar = document.querySelector('.scroll-progress__bar');

    if (categoryGrid && progressBar) {
        categoryGrid.addEventListener('scroll', () => {
            const maxScroll =
                categoryGrid.scrollWidth - categoryGrid.clientWidth;

            if (maxScroll <= 0) return;

            const progress =
                (categoryGrid.scrollLeft / maxScroll) * 100;

            progressBar.style.width = `${progress}%`;
        });
    }

});