document.addEventListener("DOMContentLoaded", () => {

    function setFooterYear() {
        const textHolder = document.querySelector("#footer-text");
        if (!textHolder) return;

        const year = new Date().getFullYear();
        textHolder.innerHTML = textHolder.innerHTML.replace("####", year);
    }


    const animatedElements = document.querySelectorAll(".fade, .slide");

    if (animatedElements.length) {
        const animationObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.2 });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.style.display =
                mobileMenu.style.display === "flex" ? "none" : "flex";
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.style.display = "none";
            });
        });
    }



    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    const modalClose = document.querySelector(".modal-close");

    function closeModal() {
        if (!modal || !modalImage) return;
        modal.classList.remove("active");
        modalImage.src = "";
    }

    if (modal && modalImage) {
        document.querySelectorAll(".modal-image").forEach(item => {
            item.addEventListener("click", () => {
                const imgSrc = item.getAttribute("data-image");
                if (!imgSrc) return;

                modalImage.src = imgSrc;
                modal.classList.add("active");
            });
        });

        modalBackdrop?.addEventListener("click", closeModal);
        modalClose?.addEventListener("click", closeModal);
    }


    const slides = document.querySelectorAll(".showcase-slide");
    const nextBtn = document.querySelector(".showcase-controls .next");
    const prevBtn = document.querySelector(".showcase-controls .prev");

    if (slides.length) {
        let currentIndex = 0;
        let autoSlideInterval = null;
        const AUTO_SLIDE_DELAY = 6000;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[index].classList.add("active");
            currentIndex = index;
        }

        function nextSlide() {
            showSlide((currentIndex + 1) % slides.length);
        }

        function prevSlide() {
            showSlide((currentIndex - 1 + slides.length) % slides.length);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        nextBtn?.addEventListener("click", () => {
            nextSlide();
            startAutoSlide();
        });

        prevBtn?.addEventListener("click", () => {
            prevSlide();
            startAutoSlide();
        });

        slides.forEach(slide => {
            slide.addEventListener("mouseenter", stopAutoSlide);
            slide.addEventListener("mouseleave", startAutoSlide);
        });

        startAutoSlide();
    }


    const videos = document.querySelectorAll(".video-container video");

    if (videos.length) {
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const video = entry.target;
                if (!(video instanceof HTMLVideoElement)) return;

                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        videos.forEach(video => videoObserver.observe(video));
    }



    setFooterYear();

});
