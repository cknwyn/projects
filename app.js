window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    function endLoad() {
        if (preloader) {
            preloader.style.display = "none"; // Hide preloader
            console.log("Preloader hidden.");
        }
        if (content) {
            content.style.display = "block"; // Show content
            console.log("Content displayed.");
        }
    }

    if (preloader && content) {
        // Hide preloader after 1.5 seconds
        setTimeout(endLoad, 1500);
    } else {
        console.warn("Preloader or content element not found.");
    }

    // Initialize Lenis instance for smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: true
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
     }
  
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.style.opacity = "0";
            } else {
                entry.target.style.opacity = "1";
            }
        }), 500;
    }, observerOptions);
  
  const images = document.querySelectorAll('.fade-image');

  images.forEach(image => {
    image.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeObserver.observe(image);
  });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.img',
            scrub: true,
        },

        scrollTrigger: {
            trigger: '.social-logos',
            scrub: true,
        }
    })
    
    .to('.img', {
        stagger: .3,
        y: -700,
    })

    .to('.social-logos', {
        stagger: .3,
        x: 60,
        x: 0,
    })


    const navbar = document.getElementById('navbar');
    const menuText = document.getElementById('menuText');

    // check if we are in the white section and update the navbar theme
    function identifySection() {
        const sections = document.querySelectorAll('.section-padding');
        
        // Ensure there are at least two sections
        if (sections.length < 2) {
            console.warn("Expected at least two sections with the class 'section-padding'.");
            return;
        }

        const whiteSection = sections[1]; // Assuming the second section is the white one
        const sectionTop = whiteSection.getBoundingClientRect().top;
        const sectionBottom = whiteSection.getBoundingClientRect().bottom;

        // Check if the white section is within the viewport and adjust theme
        if (sectionTop <= window.innerHeight / 4 && sectionBottom > window.innerHeight / 4) {
            navbar.setAttribute('data-bs-theme', 'light');
            menuText.style.color = "black";
            console.log("Switching to light theme");
        } else {
            navbar.setAttribute('data-bs-theme', 'dark');
            menuText.style.color = "white";
            console.log("Switching to dark theme");
        }
    }

    // Set up ScrollSpy if the target element is available
    const scrollSpyElement = document.querySelector('.scrollspy-example');
    if (scrollSpyElement) {
        new bootstrap.ScrollSpy(scrollSpyElement, {
            target: '#navbar-example2'
        });
    } else {
        console.warn("ScrollSpy element not found.");
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Attach the scroll event listener to update theme on scroll
    window.addEventListener('scroll', identifySection);

    // Run the function initially to set the correct theme on page load
    identifySection();
});
