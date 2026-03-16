// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let isDark = false;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    let nextTheme;
    
    if (currentTheme === 'light') nextTheme = 'dark';
    else if (currentTheme === 'dark') nextTheme = 'cyberpunk';
    else if (currentTheme === 'cyberpunk') nextTheme = 'vintage';
    else nextTheme = 'light';

    body.setAttribute('data-theme', nextTheme);
    
    const icons = {
        'light': '☀️',
        'dark': '🌙',
        'cyberpunk': '🤖',
        'vintage': '📜'
    };
    themeToggle.textContent = icons[nextTheme];
    localStorage.setItem('theme', nextTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    const icons = {
        'light': '☀️',
        'dark': '🌙',
        'cyberpunk': '🤖',
        'vintage': '📜'
    };
    themeToggle.textContent = icons[savedTheme] || '☀️';
}

// Speed Lines Animation
function createSpeedLines() {
    const container = document.getElementById('speedLines');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        const angle = Math.random() * 360;
        const length = Math.random() * 500 + 200;
        const width = Math.random() * 2 + 1;
        
        line.style.width = `${width}px`;
        line.style.height = `${length}px`;
        line.style.left = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 100}%`;
        line.style.transform = `rotate(${angle}deg)`;
        
        container.appendChild(line);
    }
}

// Chatbot Functionality
const chatToggle = document.getElementById('chatToggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbotClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatbot.classList.add('active');
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });
}

// Chatbot responses
const responses = {
    'skills': 'Mueez specializes in Full-Stack Development (MERN, Next.js), Cloud Architecture (AWS, Azure), AI/ML (TensorFlow), and has expertise in microservices, Docker, and CI/CD pipelines.',
    'projects': 'Key projects include: E-Commerce Platform (2k+ transactions/hr), Task Management SaaS (1k+ users), Decentralized Cloud Storage with AI, and Award-winning AI Robot Car.',
    'education': 'Mueez is studying Computer Science at LUMS with a 3.8/4.0 GPA (Dean\'s List), expected graduation 2028.',
    'awards': 'Awards include: Teknofest Turkey (Top 3 Worldwide), INTEL ISEF Best Project, NUST National Science Bee 1st Place in Robowars & Roborace.',
    'contact': 'You can reach Mueez at mueezahmad69@gmail.com or +92 316 4119937. He\'s also on LinkedIn and GitHub.',
    'experience': 'Mueez has experience as a Full-Stack Developer on Upwork, Software Engineering Intern at Netsol Technologies, and Open Source Contributor to projects like TensorFlow.',
    'hello': 'こんにちは！ Hello! How can I help you learn more about Mueez?',
    'hi': 'こんにちは！ Hello! How can I help you learn more about Mueez?',
    'default': 'Interesting question! You can ask me about Mueez\'s skills, projects, education, awards, experience, or contact information.'
};

function addMessage(text, isUser) {
    if (!chatMessages) return;
    const message = document.createElement('div');
    message.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
        if (lower.includes(key)) {
            return response;
        }
    }
    return responses.default;
}

if (chatSend) {
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response, false);
            }, 500);
        }
    });
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });
}

// Scroll to Top
const scrollTop = document.getElementById('scrollTop');

if (scrollTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Weather Widget (Simulated)
function updateWeather() {
    const temps = [22, 24, 26, 28, 25, 23];
    const conditions = [
        { icon: '☀️', desc: 'Sunny' },
        { icon: '🌤️', desc: 'Partly Cloudy' },
        { icon: '☁️', desc: 'Cloudy' },
        { icon: '🌧️', desc: 'Rainy' }
    ];
    
    const temp = temps[Math.floor(Math.random() * temps.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const iconEl = document.querySelector('.weather-icon');
    const tempEl = document.getElementById('weatherTemp');
    const descEl = document.getElementById('weatherDesc');

    if (iconEl) iconEl.textContent = condition.icon;
    if (tempEl) tempEl.textContent = `${temp}°C`;
    if (descEl) descEl.textContent = condition.desc;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.add('hidden');
    }, 1000);
});

// Parallax effect for speed lines
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const speedLines = document.querySelectorAll('.speed-line');
    speedLines.forEach((line, index) => {
        const speed = (index % 3 + 1) * 0.1;
        line.style.transform = `rotate(${index * 18}deg) translateY(${scrolled * speed}px)`;
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createSpeedLines();
    updateWeather();
    setInterval(updateWeather, 30000);

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('floating');
    }
});
