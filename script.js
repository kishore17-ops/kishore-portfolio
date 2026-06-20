const roles = [
  "AI & Data Science Student",
  "Python Programmer",
  "Web Developer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimer = null;

function typeEffect() {
  const currentRole = roles[roleIndex];
  const typingElement = document.getElementById("typing");
  if (!typingElement) return;

  // Determine next state BEFORE rendering
  let speed;

  if (!isDeleting) {
    // Still typing — render current charIndex, then advance
    typingElement.textContent = currentRole.substring(0, charIndex);
    charIndex++;
    if (charIndex > currentRole.length) {
      // Finished typing — pause before deleting
      isDeleting = true;
      speed = 1800;
    } else {
      speed = 110;
    }
  } else {
    // Deleting
    typingElement.textContent = currentRole.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400; // brief pause before typing next
    } else {
      speed = 55;
    }
  }

  typingTimer = setTimeout(typeEffect, speed);
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

const aboutDetails = document.querySelector("#about");
const aboutLinks = document.querySelectorAll("a[href='#about']");

aboutLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        if (aboutDetails && !aboutDetails.open) {
            aboutDetails.open = true;
        }
        aboutDetails?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
// ─── Premium Side Drawer / Mobile Nav ────────────────────────────────
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
const navBackdrop  = document.getElementById("navBackdrop");
const drawerClose  = document.getElementById("drawerClose");
const drawerLinks  = document.querySelectorAll("#drawerNav a");

function openMenu() {
  mobileDrawer.classList.add("active");
  navBackdrop.classList.add("active");
  hamburgerBtn.classList.add("open");
  hamburgerBtn.setAttribute("aria-expanded", "true");
  mobileDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileDrawer.classList.remove("active");
  navBackdrop.classList.remove("active");
  hamburgerBtn.classList.remove("open");
  hamburgerBtn.setAttribute("aria-expanded", "false");
  mobileDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function toggleMenu() {
  mobileDrawer.classList.contains("active") ? closeMenu() : openMenu();
}

// Wire up close button inside the drawer
if (drawerClose) drawerClose.addEventListener("click", closeMenu);

// Close when backdrop is tapped
if (navBackdrop) navBackdrop.addEventListener("click", closeMenu);

// Close when any drawer link is tapped
drawerLinks.forEach(link => link.addEventListener("click", closeMenu));

// Close on Escape
window.addEventListener("keydown", e => {
  if (e.key === "Escape" && mobileDrawer.classList.contains("active")) closeMenu();
});

// Keep drawer active link in sync with scroll position
window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("section[id], header[id]").forEach(sec => {
    if (scrollY >= sec.offsetTop - 160) current = sec.id || "";
  });
  drawerLinks.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === "#" + current || (href === "#" && current === "")) {
      link.classList.add("active");
    }
  });
});
const skillItems = document.querySelectorAll(".progress-item");

function animateSkillCount(el, target, duration) {
    const startTime = performance.now();

    function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.round(target * progress) + "%";
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

const skillObserver = new IntersectionObserver((entries, obs) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const item = entry.target;
            const value = parseInt(item.dataset.value, 10);
            const fill = item.querySelector(".fill");
            const percentLabel = item.querySelector(".skill-percent");

            item.classList.add("in-view");

            requestAnimationFrame(() => {
                fill.style.width = value + "%";
            });

            animateSkillCount(percentLabel, value, 1400);

            obs.unobserve(item); // animate once only, never again on rescroll
        }

    });

}, { threshold: 0.3 });

skillItems.forEach((item) => skillObserver.observe(item));

// Contact Form Submission & Validation
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const responseMessage = document.getElementById("responseMessage");

if (contactForm && submitBtn) {
    const updateSubmitButtonState = () => {
        if (contactForm.checkValidity()) {
            submitBtn.classList.remove("disabled");
        } else {
            submitBtn.classList.add("disabled");
        }
    };

    // Monitor input across all fields
    contactForm.addEventListener("input", updateSubmitButtonState);

    // Initial state check
    updateSubmitButtonState();

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Check validity: if invalid, trigger browser default validation bubbles
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Set Loading State
        submitBtn.setAttribute("disabled", "true");
        submitBtn.classList.add("disabled");
        btnText.textContent = "Sending...";

        const formData = new FormData(contactForm);

        fetch("https://formsubmit.co/ajax/kishorethiyagarajan907@gmail.com", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(data => {
            // Success Handling
            contactForm.reset();
            responseMessage.textContent = "Your form has been submitted.";
            responseMessage.className = "response-message success";
            responseMessage.style.opacity = "1";

            // Re-disable button state after form reset
            submitBtn.removeAttribute("disabled");
            updateSubmitButtonState();

            // Display success feedback for 12 seconds, then fade out
            setTimeout(() => {
                responseMessage.style.opacity = "0";
                setTimeout(() => {
                    responseMessage.textContent = "";
                }, 300);
            }, 12000);
        })
        .catch(error => {
            // Error Handling
            responseMessage.textContent = "Something went wrong. Please try again.";
            responseMessage.className = "response-message error";
            responseMessage.style.opacity = "1";

            // Restore active state to let user try again
            submitBtn.removeAttribute("disabled");
            updateSubmitButtonState();

            // Display error feedback for 6 seconds, then fade out
            setTimeout(() => {
                responseMessage.style.opacity = "0";
                setTimeout(() => {
                    responseMessage.textContent = "";
                }, 300);
            }, 6000);
        })
        .finally(() => {
            // Restore button text
            btnText.textContent = "Send Mail";
        });
    });
}