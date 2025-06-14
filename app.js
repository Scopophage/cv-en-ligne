// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Variable pour gérer l'état du menu mobile
    let isMobileMenuOpen = false;
    
    // Initialiser les animations de particules
    initParticles();

    // Navigation mobile avec animation améliorée
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            
            // Animation pour chaque ligne du hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            
            // Bloquer le scroll du body
            document.body.style.overflow = 'hidden';
        } else {
            closeMobileMenu();
        }
    });

    // Fonction pour fermer le menu mobile
    function closeMobileMenu() {
        isMobileMenuOpen = false;
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Restaurer le scroll du body
        document.body.style.overflow = '';
    }

    // Fermer le menu mobile quand on clique à l'extérieur
    document.addEventListener('click', function(e) {
        if (isMobileMenuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Fermer le menu mobile quand on clique sur un lien avec animation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Animation pour le lien cliqué
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);
            
            // Fermer le menu mobile si ouvert
            if (isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
    });

    // Smooth scroll pour la navigation avec animation améliorée
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Animation sur le lien actif
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Animation élastique de scroll
                const offsetTop = targetSection.offsetTop - 80;
                
                // Scroll fluide personnalisé
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = Math.min(Math.abs(distance) / 2, 1000); // Maximum 1 seconde
                const startTime = performance.now();
                
                function scrollAnimation(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Fonction d'easing pour un scroll plus fluide
                    const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    const easedProgress = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * easedProgress);
                    
                    if (progress < 1) {
                        requestAnimationFrame(scrollAnimation);
                    } else {
                        // Flash animation sur la section ciblée
                        targetSection.classList.add('target-highlight');
                        setTimeout(() => {
                            targetSection.classList.remove('target-highlight');
                        }, 800);
                    }
                }
                
                requestAnimationFrame(scrollAnimation);
            }
        });
    });

    // Navbar au scroll et sections actives avec animations
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Changer l'apparence de la navbar avec animation
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Mettre à jour les liens actifs avec effet d'animation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
                link.style.animation = 'navLinkPulse 0.5s ease-in-out';
                setTimeout(() => {
                    link.style.animation = '';
                }, 500);
            }
        });

        // Animations au scroll avancées
        handleScrollAnimations();
    }

    // Gestion des animations au scroll améliorées
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .skill-category, .project-card, .experience-item, .timeline-item, .form-group, .hero-content, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const elementVisible = 150;
            
            // Si l'élément entre dans la vue
            if (elementTop < window.innerHeight - elementVisible && elementBottom > 0) {
                if (!element.classList.contains('visible')) {
                    element.classList.add('visible');
                    
                    // Ajouter des délais pour les animations séquentielles des éléments enfants
                    if (element.classList.contains('skill-category')) {
                        const badges = element.querySelectorAll('.skill-badge');
                        badges.forEach((badge, index) => {
                            badge.style.animationDelay = `${index * 0.1}s`;
                            badge.classList.add('animate');
                        });
                    }
                    
                    if (element.classList.contains('timeline-item')) {
                        const siblings = Array.from(element.parentNode.children);
                        const index = siblings.indexOf(element);
                        element.style.animationDelay = `${index * 0.2}s`;
                    }
                    
                    if (element.classList.contains('project-card')) {
                        const siblings = Array.from(element.parentNode.children);
                        const index = siblings.indexOf(element);
                        element.style.animationDelay = `${index * 0.15}s`;
                    }
                }
            }
        });
    }

    // Animation des statistiques avec compteurs animés
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / 40;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 30);
            } else {
                counter.innerText = target;
                
                // Ajouter une animation après avoir atteint la cible
                counter.classList.add('counter-reached');
                setTimeout(() => {
                    counter.classList.remove('counter-reached');
                }, 1000);
            }
        });
    }

    // Observer pour les statistiques avec animation
    const aboutSection = document.getElementById('apropos');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
                
                // Animation pour les items de statistiques
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.2}s`;
                    item.classList.add('stat-animate');
                });
            }
        });
    }, { threshold: 0.5 });

    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Gestion du formulaire de contact avec animations
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Animation pour les champs de formulaire au focus
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('input-focus');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('input-focus');
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation avec animations
            if (!name || !email || !subject || !message) {
                showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                
                // Shake animation pour les champs vides
                formInputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.classList.add('shake-error');
                        setTimeout(() => {
                            input.classList.remove('shake-error');
                        }, 600);
                    }
                });
                
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Veuillez entrer une adresse email valide.', 'error');
                
                const emailInput = document.getElementById('email');
                emailInput.classList.add('shake-error');
                setTimeout(() => {
                    emailInput.classList.remove('shake-error');
                }, 600);
                
                return;
            }
            
            // Simuler l'envoi avec animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<span class="sending-dots">Envoi en cours<span>.</span><span>.</span><span>.</span></span>';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-sending');
            
            setTimeout(() => {
                showMessage('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-sending');
                
                // Animation de succès
                submitBtn.classList.add('btn-success');
                setTimeout(() => {
                    submitBtn.classList.remove('btn-success');
                }, 1500);
            }, 2000);
        });
    }

    // Fonction de validation email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Fonction pour afficher les messages avec animations
    function showMessage(text, type) {
        // Supprimer les anciens messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.classList.add('message-fade-out');
            setTimeout(() => {
                if (existingMessage.parentNode) {
                    existingMessage.remove();
                }
            }, 300);
        }
        
        // Créer le nouveau message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type} message-fade-in`;
        messageDiv.style.cssText = `
            padding: 12px 16px;
            border-radius: 8px;
            margin-top: 16px;
            font-weight: 500;
            ${type === 'success' ? 
                'background: rgba(var(--color-success-rgb), 0.1); color: var(--color-success); border: 1px solid rgba(var(--color-success-rgb), 0.2);' : 
                'background: rgba(var(--color-error-rgb), 0.1); color: var(--color-error); border: 1px solid rgba(var(--color-error-rgb), 0.2);'
            }
            transform: translateY(-20px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 10;
            position: relative;
        `;
        messageDiv.textContent = text;
        
        // Ajouter le message après le formulaire
        contactForm.appendChild(messageDiv);
        
        // Animation d'entrée
        setTimeout(() => {
            messageDiv.style.transform = 'translateY(0)';
            messageDiv.style.opacity = '1';
        }, 10);
        
        // Supprimer le message après 5 secondes avec animation
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.transform = 'translateY(20px)';
                messageDiv.style.opacity = '0';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Effet hover pour les cartes projet avec animations avancées (corrigé pour éviter les chevauchements)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Réduire l'intensité de la transformation pour éviter les chevauchements
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.zIndex = '5';
            
            // Création d'un effet d'éclat moins invasif
            const glareEffect = document.createElement('div');
            glareEffect.className = 'glare-effect';
            glareEffect.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
                z-index: 1;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                border-radius: var(--radius-lg);
            `;
            this.appendChild(glareEffect);
            
            setTimeout(() => {
                glareEffect.style.opacity = '1';
            }, 10);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            
            // Supprimer l'effet d'éclat
            const glareEffect = this.querySelector('.glare-effect');
            if (glareEffect) {
                glareEffect.style.opacity = '0';
                setTimeout(() => {
                    if (glareEffect.parentNode === this) {
                        this.removeChild(glareEffect);
                    }
                }, 300);
            }
        });
    });

    // Animation d'entrée pour le hero
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('hero-loaded');
        }
        
        // Animation pour l'avatar
        const avatar = document.querySelector('.avatar-placeholder');
        if (avatar) {
            avatar.classList.add('avatar-loaded');
        }
        
        // Animation pour le titre avec effet de machine à écrire
        animateTypewriter('.hero-title', 50);
    }, 300);

    // Fonction pour animer un texte comme une machine à écrire
    function animateTypewriter(selector, speed = 100) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Ajouter un clignotement de curseur à la fin
                element.classList.add('typewriter-done');
            }
        }, speed);
    }

    // Function pour initialiser les particules (version allégée pour éviter les problèmes de performance)
    function initParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        document.body.appendChild(particlesContainer);
        
        // Créer moins de particules pour améliorer les performances
        const particleCount = 20;
        const colors = ['#FF6B35', '#F7931E', '#E74C3C', '#F39C12', '#E67E22'];
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer, colors);
        }
    }
    
    function createParticle(container, colors) {
        const particle = document.createElement('div');
        
        // Propriétés aléatoires
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            background-color: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            top: ${y}px;
            left: ${x}px;
            opacity: 0.2;
            box-shadow: 0 0 ${size}px ${color};
            animation: float ${duration}s infinite linear ${delay}s, pulse 3s infinite alternate;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
        
        // Réinitialiser la position après l'animation
        setTimeout(() => {
            if (container.contains(particle)) {
                container.removeChild(particle);
                createParticle(container, colors);
            }
        }, (duration + delay) * 1000);
    }

    // Effet parallax pour le hero (version optimisée)
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (hero && heroBg) {
        let parallaxFrame;
        
        window.addEventListener('mousemove', (e) => {
            if (parallaxFrame) return;
            
            parallaxFrame = requestAnimationFrame(() => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                heroBg.style.transform = `translate(${mouseX * -15}px, ${mouseY * -15}px)`;
                parallaxFrame = null;
            });
        });
        
        window.addEventListener('scroll', () => {
            if (parallaxFrame) return;
            
            parallaxFrame = requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                heroBg.style.transform = `translateY(${scrolled * -0.2}px)`;
                parallaxFrame = null;
            });
        });
    }

    // Bouton retour en haut avec animation
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 0 20px var(--color-glow-primary);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        // Animation de clic
        backToTopBtn.classList.add('btn-clicked');
        
        // Animation de scroll fluide vers le haut
        const scrollTop = window.pageYOffset;
        const duration = 800;
        const start = Date.now();
        
        const scroll = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 2); // Easing quadratique
            
            window.scrollTo(0, scrollTop * (1 - easeProgress));
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            } else {
                backToTopBtn.classList.remove('btn-clicked');
            }
        };
        
        requestAnimationFrame(scroll);
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.classList.add('back-to-top-visible');
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.classList.remove('back-to-top-visible');
        }
    });

    // Gestion de la redimension de la fenêtre
    window.addEventListener('resize', () => {
        // Fermer le menu mobile lors du redimensionnement
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Gestion des erreurs JavaScript pour éviter les crash
    window.addEventListener('error', function(e) {
        console.warn('Une erreur d\'animation a été interceptée:', e.error);
    });

    // Animation d'apparition au chargement initial
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Déclencher les animations après un court délai
        setTimeout(() => {
            handleScrollAnimations();
        }, 100);
    });

    // Déclencher une vérification des animations après le chargement
    setTimeout(() => {
        handleScrollAnimations();
    }, 200);

    console.log('Portfolio Erwann Bonenfant - Chargé avec succès! 🚀🔥');
});