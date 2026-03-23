// ===== NeuralOS Core Kernel v3.0 =====

const NeuralSystem = {
    audio: {
        click: null,
        hover: null,
        play(type) {
            const sound = this[type];
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(() => {});
            }
        }
    },

    init() {
        this.initLoading();
        this.initTheme();
        this.initNavigation();
        this.initScrollEffects();
        this.initStats();
        this.initReveal();
        this.initMobileMenu();
        this.initChatbot();
        this.initContactForm();
        this.initSmoothScroll();
        this.initProjectModals();
        console.log('NeuralOS Kernel v3.0 Initialized');
    },

    initLoading() {
        window.addEventListener('load', () => {
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                setTimeout(() => {
                    overlay.classList.add('hidden');
                }, 800);
            }
        });
    },

    initNavigation() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    },

    initScrollEffects() {
        // Scroll to top button
        const scrollTop = document.getElementById('scrollTop');
        if (scrollTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    scrollTop.classList.add('visible');
                } else {
                    scrollTop.classList.remove('visible');
                }
            });

            scrollTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    },

    initStats() {
        // GitHub commits fetch
        const statCommits = document.getElementById('statCommits');
        if (statCommits) {
            this.fetchGitHubStats();
        }
    },

    async fetchGitHubStats() {
        const statCommits = document.getElementById('statCommits');
        const statProjects = document.getElementById('statProjects');
        
        try {
            // Fetch total commits from GitHub API
            const response = await fetch('https://api.github.com/users/mueezahmed455/repos?per_page=100');
            const repos = await response.json();
            
            let totalCommits = 0;
            for (const repo of repos.slice(0, 10)) {
                try {
                    const commitsRes = await fetch(repo.commits_url.replace('{/sha}', ''));
                    const commits = await commitsRes.json();
                    if (Array.isArray(commits)) {
                        totalCommits += commits.length;
                    }
                } catch (e) {
                    // Skip if rate limited
                }
            }
            
            if (statCommits) {
                statCommits.textContent = totalCommits > 0 ? `${totalCommits}+` : '100+';
            }
        } catch (e) {
            if (statCommits) statCommits.textContent = '100+';
        }
    },

    initReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Check on load
    },

    initMobileMenu() {
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        if (!mobileBtn || !navLinks) return;

        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    },

    initChatbot() {
        const chatToggle = document.getElementById('chatToggle');
        const chatbot = document.getElementById('chatbot');
        const chatClose = document.getElementById('chatbotClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');

        if (!chatbot) return;

        // Toggle chatbot
        chatToggle?.addEventListener('click', () => {
            chatbot.classList.toggle('active');
        });

        chatClose?.addEventListener('click', () => {
            chatbot.classList.remove('active');
        });

        // Send message
        const sendMessage = () => {
            const message = chatInput?.value.trim();
            if (!message) return;

            // Add user message
            this.addChatMessage(message, 'user');
            if (chatInput) chatInput.value = '';

            // Bot response
            setTimeout(() => {
                const response = this.getBotResponse(message);
                this.addChatMessage(response, 'bot');
            }, 800);
        };

        chatSend?.addEventListener('click', sendMessage);
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    },

    addChatMessage(text, type) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const message = document.createElement('div');
        message.className = `chat-message ${type}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            return "Hello! How can I help you today?";
        } else if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
            return "Mueez has worked on various projects including E-Commerce platforms, AI systems, and cloud architecture solutions. Check out the Projects section!";
        } else if (lowerMsg.includes('skill') || lowerMsg.includes('tech')) {
            return "Mueez specializes in React, Node.js, Python, AWS, and AI/ML technologies.";
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('email')) {
            return "You can reach Mueez at mueezahmad69@gmail.com or through the contact form!";
        } else if (lowerMsg.includes('experience') || lowerMsg.includes('job')) {
            return "Mueez is currently studying Computer Science at Keele University and has freelance experience with international clients.";
        } else {
            return "Thanks for your message! For specific inquiries, please use the contact form or email mueezahmad69@gmail.com";
        }
    },

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName')?.value;
            const email = document.getElementById('contactEmail')?.value;
            const subject = document.getElementById('contactSubject')?.value;
            const message = document.getElementById('contactMessage')?.value;

            // Log for now - integrate with EmailJS, Formspree, or your backend
            console.log('Contact Form Submitted:', { name, email, subject, message });
            
            // Show success state
            const successDiv = document.getElementById('formSuccess');
            if (successDiv) {
                form.style.display = 'none';
                successDiv.style.display = 'block';
            } else {
                alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon!`);
                form.reset();
            }
        });
    },

    initSmoothScroll() {
        document.querySelectorAll('.scroll-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    },

    initProjectModals() {
        const modal = document.getElementById('projectModal');
        const overlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');

        if (!modal) return;

        modalClose?.addEventListener('click', () => {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        });

        overlay?.addEventListener('click', () => {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        });
    },

    initTheme() {
        // Theme toggle functionality can be added here
        const toggle = document.getElementById('themeToggle');
        toggle?.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NeuralSystem.init());
} else {
    NeuralSystem.init();
}
