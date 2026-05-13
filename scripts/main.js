/* Providence Safari - Main JavaScript */

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileNav();
    initSearch();
    initScrollAnimations();
    initBackToTop();
    initTestimonials();
    initFAQ();
    initGallery();
});

/* ===== Header Scroll Effect =====
 * Header becomes compact on scroll
 */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ===== Mobile Navigation =====
 * Hamburger menu with slide-in drawer
 */
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const dropdownItems = document.querySelectorAll('.nav-mobile-dropdown-trigger');
    
    if (!toggle || !navMobile) return;
    
    // Toggle mobile nav
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navMobile.classList.toggle('active');
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on link click
    const navLinks = navMobile.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Dropdown toggles
    dropdownItems.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = trigger.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle('active');
                trigger.classList.toggle('active');
            }
        });
    });
}

/* ===== Search Functionality =====
 * Modal search with results
 */
function initSearch() {
    const searchBtn = document.querySelector('.header-search');
    const searchModal = document.querySelector('.search-modal');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchBtn || !searchModal) return;
    
    const searchData = [
        { title: 'Morocco Travel Guide', url: 'pages/destinations/morocco.html', category: 'Destinations' },
        { title: 'Marrakech: The Red City', url: 'morocco/marrakech.html', category: 'Morocco' },
        { title: 'Best Riads in Marrakech', url: 'blog/best-riads-marrakech.html', category: 'Blog' },
        { title: 'Egypt: Land of Pharaohs', url: 'pages/destinations/egypt.html', category: 'Destinations' },
        { title: 'South Africa Safari', url: 'pages/destinations/south-africa.html', category: 'Destinations' },
        { title: 'Tanzania: Serengeti Adventure', url: 'pages/destinations/tanzania.html', category: 'Destinations' },
        { title: 'Kenya: Safari Paradise', url: 'pages/destinations/kenya.html', category: 'Destinations' },
        { title: 'Namibia: Desert Wonders', url: 'pages/destinations/namibia.html', category: 'Destinations' },
        { title: 'Zanzibar: Island Paradise', url: 'pages/destinations/zanzibar.html', category: 'Destinations' },
        { title: 'Best Time to Visit Africa', url: 'blog/best-time-visit-africa.html', category: 'Blog' },
        { title: 'Luxury Travel in Africa', url: 'blog/luxury-travel-africa.html', category: 'Blog' },
        { title: 'How to Travel Around Morocco', url: 'blog/how-to-travel-around-morocco.html', category: 'Blog' }
    ];
    
    function openSearch() {
        searchModal.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    }
    
    function closeSearch() {
        searchModal.classList.remove('active');
        searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    }
    
    function performSearch(query) {
        if (!searchResults) return;
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-muted">No results found</p>';
            return;
        }
        
        searchResults.innerHTML = results.map(item => `
            <a href="${item.url}" class="search-result-item">
                <strong>${item.title}</strong>
                <span class="text-muted" style="display:block;font-size:0.85rem;">${item.category}</span>
            </a>
        `).join('');
    }
    
    searchBtn.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearch();
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => performSearch(e.target.value));
    }
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearch();
        }
    });
}

/* ===== Scroll Animations =====
 * Elements fade up on viewport entry
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .zoom-in');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

/* ===== Back to Top Button =====
 * Shows after scrolling down
 */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===== Testimonials Carousel =====
 * Auto-playing testimonial slider
 */
function initTestimonials() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const track = slider.querySelector('.testimonials-track');
    const dots = slider.querySelectorAll('.testimonials-dot');
    const testimonials = slider.querySelectorAll('.testimonial-card');
    
    if (!track || testimonials.length <= 1) return;
    
    let currentIndex = 0;
    let autoplayInterval;
    const totalSlides = testimonials.length;
    
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Dot navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            stopAutoplay();
            startAutoplay();
        });
    });
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
            stopAutoplay();
            startAutoplay();
        }
    }, { passive: true });
    
    startAutoplay();
}

/* ===== FAQ Accordion =====
 * Expandable FAQ items
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

/* ===== Image Gallery & Lightbox =====
 * Clickable images with lightbox view
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    
    if (galleryItems.length === 0 || !lightbox) return;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let images = [];
    let currentImageIndex = 0;
    
    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push(img.src);
            item.addEventListener('click', () => openLightbox(index));
        }
    });
    
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxContent.src = images[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxContent.src = images[currentImageIndex];
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxContent.src = images[currentImageIndex];
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

/* ===== Newsletter Form =====
 * Simple email validation and submission
 */
function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form, .footer-newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = form.querySelector('input[type="email"]');
            const email = input.value.trim();
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate submission
            alert('Thank you for subscribing! We\'ll keep you updated on the latest African travel adventures.');
            input.value = '';
        });
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== Smooth Scroll for Anchor Links =====
 * Internal page navigation
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Export for potential module use =====
window.ProvidenceSafari = {
    initHeader,
    initMobileNav,
    initSearch,
    initScrollAnimations,
    initBackToTop,
    initTestimonials,
    initFAQ,
    initGallery
};