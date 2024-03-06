const lenis = new Lenis();

function createLoadingBars(num)
{
    var container = document.createElement('div');
    container.classList.add('bars');

    var widthPercent = (100 / num);

    for (let i = 0; i < num; ++i)
    {
        var bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = widthPercent + '%';

        container.appendChild(bar);
    }

    document.body.appendChild(container);
}

function createHoverImg()
{
    var hoverImg = document.querySelector('.hover-img');
    const animateHoverImage = (e, interacting) => {
        const keyframes = {
            opacity: (interacting ? 1.0 : 0.0),
            easing: "ease-out"
        };

        hoverImg.animate(keyframes, { duration: 500, fill: "forwards" });
    };

    window.addEventListener('mousemove', (e) => {
        const interactable = e.target.closest('*[data-hover-image]'), 
            interacting = interactable !== null;

        animateHoverImage(e, interacting);
        if (interacting && interactable.dataset.hoverImage !== null)
            hoverImg.style.setProperty("--image", "url(" + interactable.dataset.hoverImage + ")");
    });
}

function createTrailer()
{
    let interacting = false;

    const trailer = document.createElement('div');
    trailer.classList.add('trailer');

    document.body.appendChild(trailer);

    const moveTrailer = (ex, ey) => {
        const x = ex - trailer.offsetWidth / 2, 
              y = ey - trailer.offsetHeight / 2;

        trailer.style.setProperty('--x', x + "px");
        trailer.style.setProperty('--y', y + "px");
    };

    const animateTrailer = (interacting) => {
        trailer.style.setProperty('--scale', (interacting ? 3.0 : 1.0));
    };

    document.querySelectorAll('a:not(.nav-link), input, textarea').forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
            animateTrailer(true);
        })

        el.addEventListener("mouseleave", (e) => {
            animateTrailer(false);
        })
    });

    window.addEventListener('mousemove', (e) => {
        moveTrailer(e.clientX, e.clientY);
    });
}

function applyPortraitEffects()
{
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

function applyLenisScroll()
{
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    });
    gsap.ticker.lagSmoothing(0);
}

function lenisScrollTo(target, d)
{
    lenis.scrollTo(target, { duration: d, easing: (x) => { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; } });
}

function applyStartingAnimation()
{
    gsap.to(
        ".bars .bar", 1.5,
        {
            height: 0,
            stagger: { amount: 0.5 },
            delay: 0.5,
            ease: 'power4.inOut'
        },
    );

    const splitText = new SplitType(".hero .name h1");
    gsap.from(
        splitText.chars, 1.5,
        {
            y: 300,
            opacity: 0,
            delay: 1.5,
            stagger: { amount: 0.2 },
            ease: 'power4.inOut'
        }
    );

    gsap.from(
        '.hero .name p', 1.5,
        {
            opacity: 0,
            delay: 2.15,
            ease: 'power4.inOut'
        }
    );

    // gsap.from(
    //     '.hero .circles', 1.5,
    //     {
    //         scale: 0,
    //         delay: 1.5,
    //         ease: 'power4.out'
    //     }
    // );
}

function applyScrollTriggers()
{
    // Navigation
    gsap.set('.floating-nav .trigger', { opacity: 0.0, rotate: '-45deg', x: "-200%" });

    ScrollTrigger.create({
        trigger: '.hero',
        start: 'bottom 90%',
        end: 'bottom 60%',
        onLeave: () => {
            gsap.to('.floating-nav .trigger', { opacity: 1.0, duration: 0.75, x: '0%', rotate: '0deg', ease: 'back.inOut' });
        },
        onEnterBack: () => {
            gsap.to('.floating-nav .trigger', { opacity: 0.0, duration: 0.75, x: '-100%', rotate: '-45deg', ease: 'back.inOut' });
            closeNavbar();
        },
    })

    // Hero Section
    gsap.to(
        '.hero',
        {
            scrollTrigger: {
                trigger: '.hero',
                start: 'bottom 100%',
                end: 'bottom 50%',
                scrub: 1,
            },
            opacity: 0,
            ease: "power2.inOut",
        },
    );

    // Educational Qualification
    gsap.from(
        '.section.education .container .listing', 1.0,
        {
            scrollTrigger: {
                trigger: '.section.education .section-header',
                start: 'top 60%',
            },
            x: 100,
            opacity: 0,
            stagger: { amount: 0.5 },
            ease: 'power4.inOut'
        },
    );

    gsap.from(
        '.section.education .container .line', 2.0,
        {
            scrollTrigger: {
                trigger: '.section.education .section-header',
                start: 'top 40%',
            },
            '--height': '0%',
            ease: 'power3.inOut'
        },
    );

    // About Me
    gsap.from(
        '.section.about-me .section-header', 1.0,
        {
            scrollTrigger: {
                trigger: '.section.about-me .section-header',
                start: 'top 70%',
            },
            opacity: 0
        }
    );

    gsap.from(
        '.section.about-me .container', 1.5,
        {
            scrollTrigger: {
                trigger: '.section.about-me .section-header',
                start: 'top 60%',
            },
            opacity: 0,
            y: 100,
            ease: 'power4.inOut'
        }
    )

    // gsap.from(
    //     '.section.about-me .container .portrait-container', 1.0,
    //     {
    //         scrollTrigger: {
    //             trigger: '.section.about-me .section-header',
    //             start: 'top 60%',
    //         },
    //         opacity: 0,
    //         x: 100
    //     }
    // )

    // Made with
    // var madeWithTimeline = gsap.timeline({ scrollTrigger: {
    //     trigger: '.section.made-with',
    //     start: 'top 60%',
    // }});

    // madeWithTimeline.from(
    //     '.section.made-with .love .animate', 0.5,
    //     {
    //         opacity: 0,
    //         x: 50
    //     }
    // )

    // madeWithTimeline.from(
    //     '.section.made-with .gsap .animate', 0.5,
    //     {
    //         opacity: 0,
    //         x: -50
    //     }
    // )

    // madeWithTimeline.from(
    //     '.section.made-with .lenis .animate', 0.5,
    //     {
    //         opacity: 0,
    //         y: 50
    //     }
    // )
}

function applyExperienceAnimation()
{
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

function applyProjectHoverEffect()
{
    const projectHeaders = document.querySelectorAll('.projects .container h2');

    for (const header of projectHeaders)
    {
        var text = header.innerHTML;
        header.innerHTML = "";

        var container = document.createElement("div");
        container.classList.add('word');

        var delay  = 0.15 / text.length;

        for (let i = 0; i < text.length; ++i)
        {
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

function checkFormValidity()
{
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
        } else {
            msg.dataset.visible = true;
        }
    });
}

function setFormListeners()
{
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
            }
        });
    });
}

function closeNavbar()
{
    const sidebar = document.querySelector('.floating-nav .sidebar');
    const btn = document.querySelector('.floating-nav .trigger');

    gsap.to(
        sidebar, 1.0, {
            x: "-100%",
            ease: 'power4.inOut'
        }
    );
    sidebar.classList.remove('open');
    btn.classList.remove('open');
}

function toggleNavbar()
{
    const sidebar = document.querySelector('.floating-nav .sidebar');
    const btn = document.querySelector('.floating-nav .trigger');

    if (sidebar.classList.contains('open')) {
        gsap.to(
            sidebar, 0.75, {
                x: "-100%",
                ease: 'power4.out'
            }
        );
        sidebar.classList.remove('open');
        btn.classList.remove('open');
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
    }
}

function navScroll(target, d)
{
    closeNavbar();
    lenisScrollTo(target, d);
}

async function setProjects()
{
    const content = projectsList;
    const container = document.querySelector(".projects .container");
    const templateCode = document.getElementById("project-listing-template").innerHTML;
    const template = new t(templateCode);

    for (const obj of content)
        container.innerHTML += template.render(obj);
}

async function setEducationPoints()
{
    const content = educationPoints;
    const container = document.querySelector(".education .main-container .container");

    const templateCode = document.getElementById("education-listing-template").innerHTML;
    const template = new t(templateCode);

    for (const obj of content)
        container.innerHTML += template.render(obj);
}

async function startWebsite()
{
    await setProjects();
    await setEducationPoints();

    createTrailer();

    createHoverImg();
    applyLenisScroll();
    applyPortraitEffects();
    createLoadingBars(10);

    applyStartingAnimation();
    applyScrollTriggers();
    applyExperienceAnimation();
    applyProjectHoverEffect();
    setFormListeners();
}