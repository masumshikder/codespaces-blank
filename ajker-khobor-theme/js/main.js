/**
 * Ajker Khobor Theme - Main JavaScript
 * @package Ajker_Khobor
 */

document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Search Toggle
    const searchToggle = document.getElementById('search-toggle');
    const searchForm = document.getElementById('search-form');

    if (searchToggle && searchForm) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchForm.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target) && !searchToggle.contains(e.target)) {
                searchForm.classList.remove('active');
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy Load Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // Add animation on scroll
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.post-card, .post-title, .featured-post').forEach(function(el) {
            observer.observe(el);
        });
    }

    // Mobile Menu Close on Link Click
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Responsive Menu for Mobile
    handleResponsiveMenu();

    // Track Scroll Position
    trackScrollPosition();

    // Add print functionality
    setupPrintFeature();
});

/**
 * Handle Responsive Menu
 */
function handleResponsiveMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuItems = document.querySelectorAll('.nav-menu > li');

    if (window.innerWidth <= 768) {
        menuItems.forEach(function(item) {
            const link = item.querySelector('a');
            if (item.querySelector('ul')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    item.classList.toggle('active');
                });
            }
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuItems.forEach(function(item) {
                item.classList.remove('active');
            });
        }
    });
}

/**
 * Track Scroll Position
 */
function trackScrollPosition() {
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scroll-top-btn');
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        }
    });
}

/**
 * Setup Print Feature
 */
function setupPrintFeature() {
    const printButtons = document.querySelectorAll('.print-btn');
    
    printButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            window.print();
        });
    });
}

/**
 * AJAX Load More Posts
 */
function loadMorePosts(page, category = '') {
    const data = {
        action: 'ajker_khobor_load_more',
        paged: page,
        category: category,
        nonce: ajkerKhobor.nonce
    };

    fetch(ajkerKhobor.ajaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(data => {
        if (data) {
            const container = document.querySelector('.posts-grid');
            if (container) {
                container.insertAdjacentHTML('beforeend', data);
            }
        }
    })
    .catch(error => console.error('Error:', error));
}

/**
 * Share Post on Social Media
 */
function shareOnSocial(platform, url, title) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, platform + '-share', 'width=600,height=400');
    }
}

/**
 * Newsletter Subscription
 */
function subscribeNewsletter(email) {
    const data = {
        action: 'ajker_khobor_subscribe',
        email: email,
        nonce: ajkerKhobor.nonce
    };

    fetch(ajkerKhobor.ajaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for subscribing!');
        } else {
            alert('Error subscribing. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
}

/**
 * Format Date
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Debounce Function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle Function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for global use
window.ajkerKhobor = window.ajkerKhobor || {};
window.ajkerKhobor.shareOnSocial = shareOnSocial;
window.ajkerKhobor.subscribeNewsletter = subscribeNewsletter;
window.ajkerKhobor.loadMorePosts = loadMorePosts;
