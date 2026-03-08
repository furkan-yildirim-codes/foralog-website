document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

            document.body.classList.toggle("menu-open");
        });
    }

});

document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const duration = 2500;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        let count = 0;

        const update = () => {
            count += increment;

            if (count < target) {

                if (counter.classList.contains("percent")) {
                    counter.innerText = "%" + Math.floor(count);
                } else {
                    counter.innerText = Math.floor(count);
                }

                setTimeout(update, stepTime);

            } else {

                if (counter.classList.contains("percent")) {
                    counter.innerText = "%" + target;
                } else if (target === 25 || target === 7) {
                    counter.innerText = target + "+";
                } else {
                    counter.innerText = target;
                }
            }
        };

        update();
    };

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    const reveals = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                if (entry.target.classList.contains("reveal-left") ||
                    entry.target.classList.contains("reveal-right")) {

                    entry.target.classList.add("reveal-active");

                } else {

                    entry.target.classList.add("active");
                }

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => {
        revealObserver.observe(el);
    });

});

const slider = document.querySelector(".hero-slider");

if (slider) {

    const images = [
        "assets/images/truck1.png",
        "assets/images/truck2.png",
        "assets/images/truck3.png",
        "assets/images/truck4.png"
    ];

    let current = 0;

    function changeSlide() {

        slider.style.opacity = 0;

        setTimeout(() => {
            slider.style.backgroundImage = `url(${images[current]})`;
            slider.style.opacity = 1;
            current = (current + 1) % images.length;
        }, 500);

    }

    slider.style.backgroundImage = `url(${images[0]})`;

    setInterval(changeSlide, 5000); // 5 saniyede bir değişir
}