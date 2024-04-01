const educationPoints = [
    {
        "qualification": "B. Tech (Computer Science)",
        "institution": "Amrita Vishwa Vidyapeetham, Chennai",
        "timespan": "2023 - 2027",
        "img": "assets/images/education/amrita-chennai.jpg"
    },
    {
        "qualification": "Class 12",
        "institution": "Bharatiya Vidya Bhavan, Chevayur",
        "timespan": "2022",
        "img": "assets/images/education/chevayur.webp"
    },
    {
        "qualification": "Class 10",
        "institution": "Bharatiya Vidya Bhavan, Perumthiruthi",
        "timespan": "2020",
        "img": "assets/images/education/perumthiruthi.jpg"
    }
];

const projectsList = [
    {
        "name": "gible",
        "platform": "GitHub",
        "link": "https://github.com/Pseurae/gible",
        "img": "assets/images/projects/gible.webp"
    },
    {
        "name": "WintermuteV3",
        "platform": "GitHub",
        "link": "https://github.com/WretchedTeam/WintermuteV3",
        "img": "assets/images/projects/project-wintermute.webp"
    },
    {
        "name": "rmnd",
        "platform": "GitHub",
        "link": "https://github.com/Pseurae/rmnd",
        "img": "assets/images/projects/rmnd.png"
    },
    {
        "name": "snakewood-improved",
        "platform": "GitHub",
        "link": "https://github.com/Pseurae/snakewood-improved",
        "img": "assets/images/projects/snakewood-improved.png"
    },
    {
        "name": "Wintermute Design",
        "platform": "Figma",
        "link": "https://www.figma.com/file/OcQTJ0ahsvwJZRTuvac9xw/Wintermute-V3---Desktop?type=design&node-id=0%3A1&mode=design&t=abCm7g4p8J7Lxq0q-1",
        "img": "assets/images/projects/project-wintermute.webp"
    }
];

const lenis = new Lenis();

function createLoadingBars(num) {
    var container = document.createElement('div');
    container.classList.add('bars');

    var widthPercent = (100 / num);

    for (let i = 0; i < num; ++i) {
        var bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = widthPercent + '%';

        container.appendChild(bar);
    }

    document.body.appendChild(container);
}

function applyPortraitEffects() {
    var img = document.querySelector(".portrait");
    img.addEventListener('mousemove', (e) => {
        var x = (e.offsetX / e.target.offsetWidth) * 2.0 - 1.0,
            y = (e.offsetY / e.target.offsetHeight) * 2.0 - 1.0;

        e.target.style.setProperty("--rotate-x", (-2 * y) + "deg");
        e.target.style.setProperty("--rotate-y", (2 * x) + "deg");
    });
    img.addEventListener('mouseleave', (e) => {
        e.target.style.setProperty("--rotate-x", 0 + "deg");
        e.target.style.setProperty("--rotate-y", 0 + "deg");
    })
}

function applyLenisScroll() {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    });
    gsap.ticker.lagSmoothing(0);
}

const SCROLL_SPEED = 2000.0; // Number of pixels scrolled per second

function lenisScrollTo(target) {
    let y;

    if (['top', 'left', 'start'].includes(target)) {
        y = 0
    } else if (['bottom', 'right', 'end'].includes(target)) {
        y = lenis.limit
    } else {
        let el;

        if (typeof target === 'string')
            el = document.querySelector(target);
        else
            el = target;

        y = el.offsetTop;
    }

    const dist = Math.abs(y - window.scrollY);

    const easingFunc = (x) => {
        return -(Math.cos(Math.PI * x) - 1) / 2;
        // return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    lenis.scrollTo(target, { duration: Math.min(dist / SCROLL_SPEED, 2.0), easing: easingFunc });

}

function applyStartingAnimation() {
    gsap.to(
        ".bars .bar", 1.5,
        {
            height: 0,
            stagger: { amount: 0.5 },
            delay: 0.5,
            ease: 'power4.inOut'
        },
    );
}

function applyScrollTriggers() {
    // Hero Section
    gsap.to(
        '.hero',
        {
            scrollTrigger: {
                trigger: '.hero',
                start: 'bottom 100%',
                end: 'bottom 15%',
                scrub: 1,
            },
            opacity: 0,
            // ease: "power2.inOut",
        },
    );

    // Educational Qualification
    gsap.from(
        '.education .container .listing', 1.0,
        {
            scrollTrigger: {
                trigger: '.education h1',
                start: 'bottom 70%',
            },
            delay: { amount: 1.0 },
            x: 100,
            opacity: 0,
            stagger: { amount: 0.5 },
            ease: 'power4.inOut'
        },
    );

    gsap.from(
        '.education .container .line', 2.0,
        {
            scrollTrigger: {
                trigger: '.education h1',
                start: 'bottom 70%',
            },
            '--height': '0%',
            ease: 'power3.out'
        },
    );

    let mm = gsap.matchMedia();
    mm.add("(max-width: 960px)", () => {
        document.querySelectorAll('.cards .card').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 75%',
                },
                duration: 0.75,
                opacity: 0,
                y: 100
            });
        });
    });

    mm.add('(min-width: 961px', () => {
        gsap.from(".cards .card", {
            scrollTrigger: {
                trigger: '.section.experience .section-header',
                start: 'bottom 70%',
            },
            duration: 0.5,
            stagger: { amount: 0.75 },
            opacity: 0,
            y: 100
        });
    });
}

function applyExperienceAnimation() {
    for (const p of document.querySelectorAll(".section.experience p")) {
        var span = document.createElement('span');
        span.classList.add('overlay');
        p.appendChild(span);

        gsap.to(
            span, {
            scrollTrigger: {
                trigger: p,
                start: 'top 70%',
                end: 'top 10%',
                scrub: true
            },
            x: "100%"
        }
        );
    }
}

function applyProjectHoverEffect() {
    const projectHeaders = document.querySelectorAll('.projects .container h2');

    for (const header of projectHeaders) {
        var text = header.innerHTML;
        header.innerHTML = "";

        var container = document.createElement("div");
        container.classList.add('word');

        var delay = 0.15 / text.length;

        for (let i = 0; i < text.length; ++i) {
            var letter = text.charAt(i);
            var s = document.createElement('span');
            s.classList.add("letter");
            s.innerHTML = letter.trim() === '' ? '\xa0' : letter;
            s.style.setProperty('--delay', ((i + 1) * delay) + 's');

            container.appendChild(s);
        }

        header.appendChild(container);
        header.appendChild(container.cloneNode(true));
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkFormValidity() {
    var formElements = [
        { id: "#name", f: (s) => { return Boolean(s); } },
        { id: "#email", f: validateEmail },
        { id: "#message", f: (s) => { return Boolean(s); } },
    ];

    formElements.forEach((o) => {
        const el = document.querySelector(o.id);
        const msg = document.querySelector(o.id + " + .error-msg");

        if (o.f(el.value)) {
            msg.dataset.visible = false;
            el.dataset.invalid = false;
        } else {
            msg.dataset.visible = true;
            el.dataset.invalid = true;
        }
    });
}

function setFormListeners() {
    var formElements = [
        "#name",
        "#email",
        "#message"
    ];

    formElements.forEach(id => {
        const el = document.querySelector(id);
        el.addEventListener('input', (e) => {
            if (!e.isComposing) {
                const msg = document.querySelector(id + " + .error-msg");
                msg.dataset.visible = false;
                el.dataset.invalid = false;
            }
        });
    });
}

function closeNavbar() {
    const sidebar = document.querySelector('.floating-nav .sidebar');
    const btn = document.querySelector('.floating-nav .trigger');
    const close = document.querySelector('.floating-nav #close');

    gsap.to(
        sidebar, 1.0, {
        x: "-100%",
        ease: 'power4.inOut'
    }
    );
    sidebar.classList.remove('open');
    btn.classList.remove('open');
    close.classList.remove('open');
}

function toggleNavbar() {
    const sidebar = document.querySelector('.floating-nav .sidebar');
    const btn = document.querySelector('.floating-nav .trigger');
    const close = document.querySelector('.floating-nav #close');

    if (sidebar.classList.contains('open')) {
        gsap.to(
            sidebar, 0.75, {
            x: "-100%",
            ease: 'power4.out'
        }
        );
        sidebar.classList.remove('open');
        btn.classList.remove('open');
        close.classList.remove('open');
    } else {
        gsap.to(
            sidebar, 0.75, {
            x: "0%",
            ease: 'power4.out',
        },
        );

        // gsap.from(
        //     '.floating-nav .sidebar ul li', {
        //         // x: '-100%',
        //         // opacity: 0.0,
        //         clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',

        //         duration: 0.75,
        //         delay: 0.4,
        //         stagger: { amount: 0.4 },
        //         ease: 'power2.inOut',
        //     }
        // );

        sidebar.classList.add('open');
        btn.classList.add('open');
        close.classList.add('open');
    }
}

function navScroll(target) {
    closeNavbar();
    lenisScrollTo(target);
}

function setProjects() {
    const content = projectsList;
    const container = document.querySelector(".projects .container");
    const templateCode = document.getElementById("project-listing-template").innerHTML;
    const template = new t(templateCode);

    for (const obj of content)
        container.innerHTML += template.render(obj);
}

function setEducationPoints() {
    const content = educationPoints;
    const container = document.querySelector(".education .main-container .container");

    const templateCode = document.getElementById("education-listing-template").innerHTML;
    const template = new t(templateCode);

    for (const obj of content)
        container.innerHTML += template.render(obj);
}

function buildHeroGrid() {
    const heroSection = document.querySelector('main .hero');

    var { width, height, _, _ } = heroSection.getBoundingClientRect();

    const columns = Math.ceil(width / 80);
    const rows = Math.ceil(height / 80);

    const container = document.querySelector('main .hero .bg-grid');
    container.innerHTML = '';

    container.style.setProperty('--columns', columns);
    container.style.setProperty('--rows', rows);

    let canClick = true;
    let toggled = false;

    for (var i = 0; i < columns * rows; ++i) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('item');
        gridItem.dataset.index = i;

        gridItem.addEventListener('click', (e) => {
            if (canClick) {
                const tw = gsap.to('.hero .bg-grid .item', 0.2, {
                    '--opacity': toggled ? 1.0 : 0.0,
                    stagger: {
                        amount: 1.0,
                        grid: [rows, columns],
                        from: e.target.dataset.index,
                    },
                    onStart: () => { canClick = false; },
                    onComplete: () => { canClick = true; toggled = !toggled; },
                });
            }
        });

        container.appendChild(gridItem);
    }
}

window.onresize = () => {
    if (document.body.clientWidth > 768)
        buildHeroGrid();
};

function startWebsite() {
    
    setProjects();
    setEducationPoints();
    changeTheme('dark', true);

    applyLenisScroll();
    applyPortraitEffects();
    createLoadingBars(10);

    if (document.body.clientWidth > 768)
        buildHeroGrid();

    applyStartingAnimation();
    applyScrollTriggers();
    applyExperienceAnimation();
    applyProjectHoverEffect();
    setFormListeners();
}

function changeTheme(theme, first) {
    const style = document.createElement("style");
    const css = document.createTextNode(`main *, footer *, .floating-nav * {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
    };`);
    style.appendChild(css);
    
    const disable = () => document.head.appendChild(style);
    const enable = () => document.head.removeChild(style);

    if (!first) disable();

    document.querySelector('#theme').value = theme;
    document.body.dataset.theme = theme;

    if (!first) 
    {
        "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend".split(" ").forEach((e) => {
            document.body.addEventListener(e, enable, { once: true });
        });
    }
}