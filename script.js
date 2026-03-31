if (window.Typed) {
    new Typed(".text", {
        strings: ["Programming", "UI Designing", "Web Development"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

const toTop = document.querySelector(".top");
const nav = document.getElementById("myLinks");
const navToggle = document.getElementById("navToggle");
const navToggleIcon = document.getElementById("navToggleIcon");
const navLinks = document.querySelectorAll(".navbar a");
const trackedSections = document.querySelectorAll("#Home, #About, #Skills, #Projects, #Contact");

window.addEventListener("scroll", () => {
    if (!toTop) return;
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});

const setActiveNav = (id) => {
    navLinks.forEach((link) => {
        const target = link.getAttribute("href");
        if (target === `#${id}`) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};

const activateCurrentSection = () => {
    const marker = window.scrollY + window.innerHeight * 0.35;
    let currentId = "Home";

    trackedSections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (marker >= top && marker < bottom) {
            currentId = section.id;
        }
    });

    setActiveNav(currentId);
};

window.addEventListener("scroll", activateCurrentSection);
window.addEventListener("load", activateCurrentSection);

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const targetId = link.getAttribute("href")?.replace("#", "");
        if (targetId) {
            setActiveNav(targetId);
        }

        if (window.innerWidth <= 768 && nav && navToggle) {
            nav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            if (navToggleIcon) {
                navToggleIcon.classList.remove("bx-x");
                navToggleIcon.classList.add("bx-menu");
            }
        }
    });
});

if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        if (navToggleIcon) {
            navToggleIcon.classList.toggle("bx-menu", !isOpen);
            navToggleIcon.classList.toggle("bx-x", isOpen);
        }
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && nav && navToggle) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        if (navToggleIcon) {
            navToggleIcon.classList.remove("bx-x");
            navToggleIcon.classList.add("bx-menu");
        }
    }
});

const revealTargets = document.querySelectorAll(
    ".about, .container1, .container2, .row, .prj-list div, .contact-text"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.18 }
);

revealTargets.forEach((element) => {
    element.classList.add("reveal-item");
    revealObserver.observe(element);
});

const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (supportsFinePointer) {
    document.body.classList.add("cursor-enabled");

    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";

    const cursorRing = document.createElement("div");
    cursorRing.className = "cursor-ring";

    document.body.appendChild(cursorRing);
    document.body.appendChild(cursorDot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        requestAnimationFrame(renderCursor);
    };

    window.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursorDot.classList.add("active");
        cursorRing.classList.add("active");
    });

    window.addEventListener("mousedown", () => {
        cursorRing.classList.add("clicking");
    });

    window.addEventListener("mouseup", () => {
        cursorRing.classList.remove("clicking");
    });

    const interactiveElements = document.querySelectorAll("a, button, .row, .prj-list div, .top");

    interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            cursorRing.classList.add("hovering");
        });

        element.addEventListener("mouseleave", () => {
            cursorRing.classList.remove("hovering");
        });
    });

    renderCursor();
}
