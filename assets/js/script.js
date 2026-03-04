const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; 
    const stepTime = 20;   
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    let count = 0;

    const update = () => {
        count += increment;

        if (count < target) {
            counter.innerText = Math.floor(count);
            setTimeout(update, stepTime);
        } else {
            counter.innerText = target + (target === 25 || target === 7 ? "+" : "");
        }
    };

    update();
};

const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);