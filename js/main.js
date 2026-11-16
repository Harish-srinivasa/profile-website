
/* ==========================================
   PROFILE WEBSITE - JAVASCRIPT
   Vanilla JavaScript (ES6+)
   ========================================== */


/* ==========================================
   1. MOBILE NAVIGATION
   ========================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    // Open and close mobile navigation
    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    // Close navigation after clicking a link
    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });

}


/* ==========================================
   2. SHOW MORE / SHOW LESS TIMELINE
   ========================================== */

const timelineItems = document.querySelectorAll(".timeline-item");

const showMoreButton = document.getElementById("show-more-btn");

const visibleTimelineItems = 3;

if (timelineItems.length > visibleTimelineItems && showMoreButton) {

    // Initially hide timeline items after the first three
    timelineItems.forEach((item, index) => {

        if (index >= visibleTimelineItems) {

            item.classList.add("hidden");

        }

    });

    let timelineExpanded = false;

    showMoreButton.addEventListener("click", () => {

        timelineExpanded = !timelineExpanded;

        timelineItems.forEach((item, index) => {

            if (index >= visibleTimelineItems) {

                item.classList.toggle("hidden", !timelineExpanded);

            }

        });

        showMoreButton.textContent = timelineExpanded
            ? "Show Less"
            : "Show More";

    });

} else if (showMoreButton) {

    // Hide button when there are three or fewer milestones
    showMoreButton.style.display = "none";

}


/* ==========================================
   3. SCROLL-TRIGGERED ANIMATIONS
   Using IntersectionObserver
   ========================================== */

// Select elements that should animate on scroll
const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".timeline-item, " +
    ".interest-card, " +
    ".family-card, " +
    ".family-banner, " +
    ".hobby-item"
);

// Add reveal class to selected elements
revealElements.forEach(element => {

    element.classList.add("reveal");

});


// Create IntersectionObserver
const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                // Stop observing after the animation occurs
                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


// Observe each element
revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==========================================
   4. HOBBIES IMAGE LIGHTBOX
   ========================================== */

const hobbyImages = document.querySelectorAll(".hobby-image");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxClose = document.getElementById("lightbox-close");


// Open lightbox when an image is clicked
hobbyImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// Close lightbox
function closeLightbox() {

    lightbox.classList.remove("active");

    lightboxImage.src = "";

    document.body.style.overflow = "";

}


// Close using close button
if (lightboxClose) {

    lightboxClose.addEventListener("click", closeLightbox);

}


// Close by clicking outside the image
if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


// Close using Escape key
document.addEventListener("keydown", event => {

    if (event.key === "Escape" && lightbox.classList.contains("active")) {

        closeLightbox();

    }

});


/* ==========================================
   5. AUTOMATIC COPYRIGHT YEAR
   ========================================== */

const currentYear = document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ==========================================
   6. BACK TO TOP BUTTON
   ========================================== */

const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {

    backToTopButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
