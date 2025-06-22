document.addEventListener('DOMContentLoaded', () => {
    // navbar .active
    const navLinks = document.querySelectorAll('.nav-links');
    const sections = Array.from(navLinks).map(link => {
        const section = link.getAttribute('href');
        return document.querySelector(section);
    });

    // add .active to current navLink
    function checkSection() {
        let scrollPos = window.scrollY + 150; // offset from section to navbar to detect section
        sections.forEach((section, i) => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[i].classList.add('active');
            }
        });
    }

    // check current section on scroll
    window.addEventListener('scroll', checkSection);
    checkSection();


    // hide and show funcs
    const expCards = document.querySelectorAll('.exp-card');
    const experienceSection = document.getElementById('experiences');

    // hide to 3 cards func
    function hideCards() {
        const showCards = Array.from(expCards).filter(card => card.style.display !== 'none');
        showCards.forEach((card, i) => {
            if (i >= 3){
                card.style.display = 'none';
            };
        });
        experienceSection.style.height = '100vh';
    };
    hideCards();

    // show all cards func
    function setCurrCards() {
        if (globalThis.filter) {
            currCards.forEach(card => {
                card.style.display = '';
            });
        }
        else {
            expCards.forEach(card => {
                card.style.display = '';
            });
        }
    };

    // view btns
    const viewMoreBtn = document.getElementById('view-more-btn');
    const viewLessBtn = document.getElementById('view-less-btn');
    viewLessBtn.style.display = 'none';

    //view more func
    viewMoreBtn.addEventListener('click', () => {
        setCurrCards();
        experienceSection.style.height = 'auto';
        viewMoreBtn.style.display = 'none';
        viewLessBtn.style.display = '';
    });

    //view less func
    viewLessBtn.addEventListener('click', () => {
        hideCards();
        viewLessBtn.style.display = 'none';
        viewMoreBtn.style.display = '';
        window.scrollTo({
            top: document.querySelector('#experiences').offsetTop,
            behavior: 'smooth'
        });
    });

    // exp-card filter
    const filterBtns = document.querySelectorAll('.exp-filter button');
    const noExpMsg = document.getElementById('no-exp-msg');
    noExpMsg.style.display = 'none';
    filterBtns[0].classList.add('active');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('filter');
            let shown = 0;
            expCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('filter') === filter) {
                    card.style.display = '';
                    shown++;
                } else {
                    card.style.display = 'none';
                }
            });
            globalThis.filter = true;
            globalThis.currCards = Array.from(expCards).filter(card => card.style.display !== 'none');
            if (shown === 0) {
                noExpMsg.style.display = '';
                viewMoreBtn.style.display = 'none';
                viewLessBtn.style.display = 'none';
            }
            else if (shown > 3) {
                noExpMsg.style.display = 'none';
                hideCards();
                viewMoreBtn.style.display = '';
                viewLessBtn.style.display = 'none';
            }
            else {
                noExpMsg.style.display = 'none';
                viewMoreBtn.style.display = 'none';
                viewLessBtn.style.display = 'none';
            }
            experienceSection.style.height = '100vh';
        });
    });

    // see more func
    const seeMoreBackground = document.querySelector('.see-more-background');
    seeMoreBackground.style.display = 'none';
    const seeMoreBtns = document.querySelectorAll('.exp-button');
    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            seeMoreId = btn.id;
            seeMoreBackground.style.display = '';
            globalThis.seeMoreContainer = document.getElementById('see-more-'+seeMoreId);
            seeMoreContainer.style.display = 'block';
        });
    });

    // close see more func
    const closeBtn = document.querySelectorAll('.close-btn');
    closeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            seeMoreBackground.style.display = 'none';
            seeMoreContainer.style.display = 'none';
        });
    });
});