const roles = [
  "AI & Data Science Student",
  "Python Programmer",
  "Web Developer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

  const currentRole = roles[roleIndex];
  const typingElement = document.getElementById("typing");

  if (isDeleting) {
    typingElement.textContent =
      currentRole.substring(0, charIndex--);
  } else {
    typingElement.textContent =
      currentRole.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length + 1) {
    speed = 1500;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();
const particlesContainer =
document.getElementById("particles");

for(let i = 0; i < 50; i++){

    const particle =
    document.createElement("div");

    particle.classList.add("particle");

    particle.style.left =
    Math.random() * 100 + "%";

    particle.style.animationDuration =
    (Math.random() * 10 + 5) + "s";

    particle.style.opacity =
    Math.random();

    particlesContainer.appendChild(particle);
}
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){
            element.classList.add("active");
        }

    });

});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if(scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if(
            link.getAttribute("href") === "#" + current
        ){
            link.classList.add("active");
        }

    });

});

const profileImage = document.getElementById("profileImage");
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxClose = document.getElementById("lightboxClose");

if (profileImage && lightboxOverlay) {
    profileImage.addEventListener("click", () => {
        lightboxOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    const closeLightbox = () => {
        lightboxOverlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    lightboxOverlay.addEventListener("click", (event) => {
        if (event.target === lightboxOverlay || event.target === lightboxClose) {
            closeLightbox();
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightboxOverlay.classList.contains("active")) {
            closeLightbox();
        }
    });
}