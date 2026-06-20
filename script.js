

const words = [
    "Frontend Developer",
    "DSA Learner",
    "Java Programmer",
    "Problem Solver",
    "Computer Science Student"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();




const revealElements = document.querySelectorAll(
    ".glass-card, .skill-card, .project-card, .achievement-card"
);

revealElements.forEach((item) => {
    item.classList.add("fade-up");
});

function revealOnScroll() {

    revealElements.forEach((element) => {

        const windowHeight = window.innerHeight;

        const revealTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            element.classList.add("show");

        }
    });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();



window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".custom-nav");

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 0 20px rgba(79,140,255,0.25)";

    } else {

        navbar.style.boxShadow = "none";
    }
});




const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop
            &&
            pageYOffset <
            sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + current
        ) {

            link.classList.add("active");
        }
    });
});


const glow = document.createElement("div");

glow.style.width = "20px";
glow.style.height = "20px";
glow.style.borderRadius = "50%";
glow.style.position = "fixed";
glow.style.pointerEvents = "none";
glow.style.background =
    "rgba(79,140,255,0.5)";
glow.style.filter = "blur(8px)";
glow.style.zIndex = "9999";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";
});




console.log(
"Welcome to Pradeepthi Reddy's Portfolio 🚀"
);
```
