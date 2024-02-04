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
    const lenis = new Lenis();   
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    });
    gsap.ticker.lagSmoothing(0);
}

function scrollToTop()
{
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
    });
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
    )

    gsap.from(
        '.hero .name p', 1.5,
        {
            opacity: 0,
            delay: 2.15,
            ease: 'power4.inOut'
        }
    )
}

function applyScrollTriggers()
{
    gsap.to(
        ".scroll-indicator",
        {
            scrollTrigger: {
                trigger: ".hero",
                start: "bottom 50%",
                end: "bottom 70%",
                scrub: 1
            },
            opacity: 0
        }
    )

    gsap.from(
        '.section.education .section-header', 0.5,
        {
            scrollTrigger: {
                trigger: '.section.education .section-header',
                start: 'top 80%'
            },
            opacity: 0
        }
    );

    gsap.from(
        '.section.education .listing', 1.0,
        {
            scrollTrigger: {
                trigger: '.section.education .section-header',
                start: 'top 80%',
            },
            opacity: 0,
            x: 100,
            delay: 0.25,
            stagger: { amount: 0.5 }
        }
    );

    gsap.from(
        '.section.education .line', 1.0,
        {
            scrollTrigger: {
                trigger: '#education-start',
                start: 'top 20%',
            },
            delay: 0.25,
            height: '0%',
        }
    );

    gsap.from(
        ".section.about-me .container", 1.0,
        {
            scrollTrigger: {
                trigger: '#about-me-start',
                start: 'top 40%'
            },
            delay: 0.1,
            opacity: 0
        }
    );
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
