window.onload = function () {
    const slider = document.querySelector('.slider--animate');
    const sliderTexts = slider.children;
    const holder = sliderTexts[0];

    function changeText(holder, idx) {
        holder.innerHTML = sliderTexts[idx].innerHTML;
    }

    function animate() {
        let idx = 2;
        return () => {
            fadeOut(holder);
            setTimeout(() => {
                if (idx >= sliderTexts.length) idx = 1;
                changeText(holder, idx++);
                fadeIn(holder);
            }, 200);
        };
    }
    setTimeout(() => {
        animate();

        setInterval(animate(), 1200);
    }, 300);

    function handleActive(items, cb) {
        return function (e) {
            const wasActive = this.classList.contains('active');
            if (wasActive) {
                collapseSection(this);
                this.classList.remove('active');
            } else {
                expandSection(this);
                this.classList.add('active');
                if (cb) cb(this);
            }

            for (let f of items) {
                if (f != this && f.classList.contains('active')) {
                    collapseSection(f);
                    f.classList.remove('active');
                }
            }
        };
    }

    /* Cookie */
    const COOKIE_KEY = 'cookie';
    function hideCookieDialog() {
        document.querySelector('.cookie').style.display = 'none';
    }

    const previosCookieAction = JSON.parse(localStorage.getItem(COOKIE_KEY) || '{}');

    if (previosCookieAction.action === 'allowed') {
        hideCookieDialog();
        runGTM();
    } else if (previosCookieAction.action === 'rejected') {
        hideCookieDialog();
    }

    const acceptButton = document.querySelector('.actions .accept');
    acceptButton.addEventListener('click', function (e) {
        hideCookieDialog();
        runGTM();
        localStorage.setItem(COOKIE_KEY, JSON.stringify({ action: 'allowed', time: new Date() }));
    });

    const rejectButton = document.querySelector('.actions .reject');
    rejectButton.addEventListener('click', function (e) {
        hideCookieDialog();
        localStorage.setItem(COOKIE_KEY, JSON.stringify({ action: 'rejected', time: new Date() }));
    });

    /* -------- prepase collapsable grids -------- */
    const faqs = document.querySelectorAll('.faq--container > .grid-properties  .property');
    for (let f of faqs) {
        f.addEventListener('click', handleActive(faqs));
    }

    function prepareCollapsableGrids(e) {
        const notActive = document.querySelectorAll('.grid-properties--collapse .property:not(.active)');
        for (const el of notActive) {
            resetSectionHeight(el);
            collapseSection(el);
        }
        const active = document.querySelectorAll('.grid-properties--collapse .active');
        for (const el of active) {
            resetSectionHeight(el);
            setSectionHeight(el);
        }
    }

    prepareCollapsableGrids();
    window.addEventListener('resize', prepareCollapsableGrids);

    /* -------- instructions image -------- */
    const imagesInstructions = document.querySelectorAll('.image-instructions > img');
    function changeImage(el) {
        const imageSrc = el.getAttribute('data-image');
        if (imageSrc) {
            for (let img of imagesInstructions) {
                img.src = imageSrc;
            }
        }
    }

    const instructions = document.querySelectorAll('.instructions--container .grid-properties  .property');
    for (let f of instructions) {
        f.addEventListener('click', handleActive(instructions, changeImage));
    }

    /* -------- scrolling image -------- */
    const movableImage = document.querySelector('#movable-alfasilver');
    const staticImage = document.querySelector('.wounds--container');
    const offset = movableImage.offsetTop;
    const maxTop = staticImage.offsetTop - 200;
    window.onscroll = function (e) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const target = offset + scrollTop;

        if (target < maxTop) {
            movableImage.style.top = `${offset + scrollTop}px`;
        }
    };

    /* ------ navigation ------ */
    const menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
};

/* introduction animation */
function fadeOut(el) {
    el.style.opacity = 0;
}

function fadeIn(el) {
    el.style.opacity = 1;
}

/*  -------------- COLAPSE -------------- */

function setSectionHeight(element) {
    element = element.children[0];
    element.style.height = `${element.clientHeight}px`;
}

function resetSectionHeight(element) {
    element = element.children[0];
    element.style.height = 'auto';
}

function collapseSection(element) {
    element = element.children[0];
    // get the height of the element's inner content, regardless of its actual size
    const orinalHeight = element.clientHeight;
    const textHeight = findP(element).scrollHeight;

    element.style.height = `${orinalHeight - textHeight}px`;
}

function expandSection(element) {
    element = element.children[0];
    const orinalHeight = element.clientHeight;
    const textHeight = findP(element).scrollHeight;

    element.style.height = `${orinalHeight + textHeight}px`;
}

function findP(element) {
    for (const e of element.children) {
        if (e.tagName == 'P') return e;
    }
}
