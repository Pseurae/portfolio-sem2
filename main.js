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

function createTrailer()
{
    const trailer = document.querySelector('.trailer');

    const animateTrailer = (e, interacting) => {
        const x = e.clientX - trailer.offsetWidth / 2, 
              y = e.clientY - trailer.offsetHeight / 2;

        const keyframes = {
            left: x + 'px',
            top: y + 'px',
            scale: (interacting ? 3.0 : 1.0)
        };

        trailer.animate(keyframes, { duration: 200, fill: "forwards" });
    };

    window.addEventListener('mousemove', (e) => {
        const on_link = e.target.closest('a');
        animateTrailer(e, on_link !== null);
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

function scrollToTop()
{
    lenis.scrollTo(0, { duration: 3, easing: (x) => { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; } });
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

    // const splitText = new SplitType(".hero .name h1");
    // gsap.from(
    //     splitText.chars, 1.5,
    //     {
    //         y: 300,
    //         opacity: 0,
    //         delay: 1.5,
    //         stagger: { amount: 0.2 },
    //         ease: 'power4.inOut'
    //     }
    // );

    gsap.from(
        '.hero .name p', 1.5,
        {
            opacity: 0,
            delay: 2.15,
            ease: 'power4.inOut'
        }
    );

    gsap.from(
        '.hero .circles', 1.5,
        {
            scale: 0,
            delay: 1.5,
            ease: 'power4.out'
        }
    );
}

function applyScrollTriggers()
{
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
            ease: "power2.inOut"
        }
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
    var madeWithTimeline = gsap.timeline({ scrollTrigger: {
        trigger: '.section.made-with',
        start: 'top 60%',
    }});

    madeWithTimeline.from(
        '.section.made-with .love .animate', 0.5,
        {
            opacity: 0,
            x: 50
        }
    )

    madeWithTimeline.from(
        '.section.made-with .gsap .animate', 0.5,
        {
            opacity: 0,
            x: -50
        }
    )

    madeWithTimeline.from(
        '.section.made-with .lenis .animate', 0.5,
        {
            opacity: 0,
            y: 50
        }
    )
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
    for (const header of document.querySelectorAll('.projects .container h2'))
    {
        var text = header.innerHTML;
        header.innerHTML = "";

        var container = document.createElement("div");
        container.classList.add('word');

        for (let i = 0; i < text.length; ++i)
        {
            var letter = text.charAt(i);
            var s = document.createElement('span');
            s.classList.add("letter");
            s.innerHTML = letter.trim() === '' ? '\xa0' : letter;
            s.style.setProperty('--delay', ((i + 1) * 0.03) + 's');

            container.appendChild(s);
        }

        header.appendChild(container);
        header.appendChild(container.cloneNode(true));
    }
}
