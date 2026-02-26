/* =========================================
   Linux Lab Documentation JS
   Production Version
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    initializeTheme();
    initializeSidebar();
    initializeImageZoom();
    initializeCopyButtons();
    initializeFooterMeta();
});

/* =========================================
   THEME TOGGLE
========================================= */

function initializeTheme() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    toggleBtn.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}

/* =========================================
   SIDEBAR (Highlight + Collapsible)
========================================= */

function initializeSidebar() {
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-link").forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");

            const section = link.closest(".nav-section");
            if (section) {
                section.classList.add("open");
            }
        }
    });

    document.querySelectorAll(".collapsible").forEach((button) => {
        button.addEventListener("click", function () {
            const section = this.closest(".nav-section");

            document.querySelectorAll(".nav-section").forEach((sec) => {
                if (sec !== section) {
                    sec.classList.remove("open");
                }
            });

            section.classList.toggle("open");
        });
    });
}

/* =========================================
   IMAGE LIGHTBOX
========================================= */

function initializeImageZoom() {
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");

    if (!lightbox || !lightboxImg) return;

    document.querySelectorAll(".zoomable").forEach((img) => {
        img.addEventListener("click", function () {
            lightboxImg.src = this.src;
            caption.textContent = this.alt || "";

            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Close when clicking outside image
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ESC key close
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* =========================================
   COPY BUTTONS FOR CODE BLOCKS
========================================= */

function initializeCopyButtons() {
    document.querySelectorAll("pre").forEach((pre) => {
        // Avoid duplicate buttons
        if (pre.querySelector(".copy-button")) return;

        const button = document.createElement("button");
        button.className = "copy-button";
        button.textContent = "Copy";

        pre.appendChild(button);

        button.addEventListener("click", function () {
            const code = pre.querySelector("code");
            if (!code) return;

            navigator.clipboard.writeText(code.innerText).then(() => {
                button.textContent = "Copied";
                setTimeout(() => {
                    button.textContent = "Copy";
                }, 2000);
            });
        });
    });
}

/* =========================================
   FOOTER META RENDERING
========================================= */

function initializeFooterMeta() {
    document.querySelectorAll(".doc-meta").forEach((meta) => {
        const author = meta.dataset.author || "";
        const created = meta.dataset.created || "";
        const updated = meta.dataset.updated || "";

        let text = "";

        if (author) text += `Author: ${author}`;
        if (created) text += ` | Created: ${created}`;
        if (updated) text += ` | Last Updated: ${updated}`;

        if (text) {
            meta.textContent = text;
        }
    });
}
