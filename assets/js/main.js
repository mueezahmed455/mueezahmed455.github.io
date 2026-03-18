// ===== Manga Portfolio Core Engine =====

document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    initTheme();
    initLanguage();
    initSpeedLines();
    initChatbot();
    initMusicPlayer();
    initWeather();
    initScrollEffects();
    initGitHubStats();
    initTerminal();
    initProjectInteractions();
});

// 1. Loading Overlay
function initLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        window.addEventListener('load', () => {
            setTimeout(() => overlay.classList.add('hidden'), 1000);
        });
    }
}

// 2. Theme Engine
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    body.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
        
        themeToggle.addEventListener('click', () => {
            const current = body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', next);
            themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
            localStorage.setItem('theme', next);
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: next } }));
        });
    }
}

// 3. Language Engine
function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    const body = document.body;
    const savedLang = localStorage.getItem('lang') || 'en';
    
    body.className = body.className.replace(/lang-\w+/, '') + ` lang-${savedLang}`;
    if (langToggle) {
        langToggle.textContent = savedLang.toUpperCase();
        
        langToggle.addEventListener('click', () => {
            const current = body.classList.contains('lang-jp') ? 'jp' : 'en';
            const next = current === 'jp' ? 'en' : 'jp';
            body.className = body.className.replace(/lang-\w+/, '') + ` lang-${next}`;
            langToggle.textContent = next.toUpperCase();
            localStorage.setItem('lang', next);
        });
    }
}

// 4. Manga Speed Lines
function initSpeedLines() {
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

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.speed-line').forEach((line, index) => {
            const speed = (index % 3 + 1) * 0.1;
            const originalTransform = line.style.transform.split(' translateY')[0];
            line.style.transform = `${originalTransform} translateY(${scrolled * speed}px)`;
        });
    });
}

// 5. Chatbot
function initChatbot() {
    const chatToggle = document.getElementById('chatToggle');
    const chatbot = document.getElementById('chatbot');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatbot) return;

    chatToggle?.addEventListener('click', () => chatbot.classList.add('active'));
    chatbotClose?.addEventListener('click', () => chatbot.classList.remove('active'));

    function addMessage(text, isUser) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend?.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, true);
            chatInput.value = '';
            setTimeout(() => addMessage("I'm analyzing that... Mueez is an expert in MERN and AI Systems.", false), 500);
        }
    });
}

// 6. Real Music Player & Visualizer
function initMusicPlayer() {
    const playBtn = document.getElementById('musicPlay');
    const canvas = document.getElementById('visualizer');
    if (!playBtn || !canvas) return;

    const audio = new Audio('https://stream.zeno.fm/0r0xa792kwzuv'); // Lofi Radio Stream
    audio.crossOrigin = "anonymous";
    
    let audioCtx, analyser, source, dataArray;
    let isInitialized = false;

    function initAudio() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        isInitialized = true;
        draw();
    }

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        
        const barWidth = (width / dataArray.length) * 2.5;
        let x = 0;
        const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim();

        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = (dataArray[i] / 255) * height;
            ctx.fillStyle = accentColor;
            ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
            x += barWidth;
        }
    }

    playBtn.addEventListener('click', () => {
        if (!isInitialized) initAudio();
        
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸';
        } else {
            audio.pause();
            playBtn.textContent = '▶';
        }
    });
}

// 7. Weather
async function initWeather() {
    const tempEl = document.getElementById('weatherTemp');
    if (!tempEl) return;
    tempEl.textContent = '18°C';
}

// 8. Scroll Effects
function initScrollEffects() {
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (scrollTop) scrollTop.classList.toggle('visible', window.pageYOffset > 300);
    });
    scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// 11. GitHub Stats
async function initGitHubStats() {
    const commitEl = document.querySelector('#stat-commits .stat-number');
    if (commitEl) commitEl.textContent = '742+';
}

// 12. Terminal
function initTerminal() {
    const term = document.getElementById('terminal-content');
    if (!term) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-prompt">></span> System Online. Welcome, Mueez.`;
    term.appendChild(line);
}

// Project Interactions
function initProjectInteractions() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            alert("Manga Reader Mode: " + card.querySelector('.project-title').textContent);
        });
    });
}

function initContactForm() {}
