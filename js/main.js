
document.addEventListener("DOMContentLoaded", () => {

    // 1. MOBILE NAVIGATION

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }


    // 2. SHOW MORE / SHOW LESS TIMELINE

    const timelineItems = document.querySelectorAll(".timeline-item");
    const showMoreButton = document.getElementById("show-more-btn");

    const initiallyVisibleItems = 3;

    if (timelineItems.length > initiallyVisibleItems && showMoreButton) {
        let expanded = false;

        timelineItems.forEach((item, index) => {
            if (index >= initiallyVisibleItems) {
                item.classList.add("hidden");
            }
        });

        showMoreButton.addEventListener("click", () => {
            expanded = !expanded;

            timelineItems.forEach((item, index) => {
                if (index >= initiallyVisibleItems) {
                    item.classList.toggle("hidden", !expanded);
                }
            });

            showMoreButton.textContent = expanded
                ? "Show Less"
                : "Show More";
        });
    } else if (showMoreButton) {
        showMoreButton.style.display = "none";
    }


    // 3. SCROLL REVEAL ANIMATIONS

    const revealElements = document.querySelectorAll(
        ".section-heading, .timeline-item, .interest-card, " +
        ".family-card, .family-banner, .hobby-item"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    // 4. IMAGE LIGHTBOX

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.getElementById("lightbox-close");

    const hobbyImages = document.querySelectorAll(".hobby-image");

    function openLightbox(image) {
        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || "Expanded hobby image";

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }

    hobbyImages.forEach((image) => {
        image.addEventListener("click", () => {
            openLightbox(image);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("active")
        ) {
            closeLightbox();
        }
    });


    // 5. AUTOMATIC COPYRIGHT YEAR

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 6. BACK TO TOP

    const backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
