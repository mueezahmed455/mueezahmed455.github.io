// Milestone 1-5: The NeuralOS Full Integration

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
    initDevMode();
    initVoiceControl();
    initSREHealth();
    initVisitorGlobe();
    initWasmPlayground();
    initGuestbook();
    initBlockchainSim();
    initJWTDebugger();
});

// --- Milestone 4: 3D Visitor Globe ---
function initVisitorGlobe() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const light = new THREE.PointLight(0xd32f2f, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 12;

    window.neuralGlobePing = () => {
        const pingGeo = new THREE.SphereGeometry(0.2, 8, 8);
        const pingMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const ping = new THREE.Mesh(pingGeo, pingMat);
        
        const lat = (Math.random() - 0.5) * Math.PI;
        const lon = Math.random() * Math.PI * 2;
        const r = 5;
        
        ping.position.x = r * Math.cos(lat) * Math.cos(lon);
        ping.position.y = r * Math.sin(lat);
        ping.position.z = r * Math.cos(lat) * Math.sin(lon);
        
        globe.add(ping);
        setTimeout(() => globe.remove(ping), 2000);
    };

    function animateGlobe() {
        requestAnimationFrame(animateGlobe);
        globe.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animateGlobe();
}

// --- Milestone 5: Wasm Python Playground ---
async function initWasmPlayground() {
    const output = document.getElementById('wasm-output');
    const runBtn = document.getElementById('run-python');
    const codeInput = document.getElementById('python-code');
    
    if (!runBtn) return;

    runBtn.onclick = async () => {
        output.textContent = "Loading WebAssembly Runtime...";
        try {
            // Loading Pyodide from CDN
            if (!window.pyodide) {
                window.pyodide = await loadPyodide();
            }
            const code = codeInput.value;
            const result = await window.pyodide.runPythonAsync(code);
            output.textContent = result || "Execution successful (no output).";
        } catch (e) {
            output.textContent = `Error: ${e.message}`;
        }
    };
}

// --- Expanded Knowledge Base (RAG-Lite) ---
const KNOWLEDGE_BASE = [
    {
        topic: 'experience',
        content: 'Mueez has worked at M/S AUZBIZ as a Digital Marketing & Tech Expert, Indus Hospital as an Internee, and is the Founder of Inayat NGO and X.group. He is also a Backend Developer at SFB.',
        keywords: ['work', 'experience', 'job', 'auzbiz', 'founder', 'ngo', 'sfb']
    },
    {
        topic: 'awards',
        content: 'Awards include: Teknofest Turkey Best Category (2019), Intel ISEF National Winner (2020), PYPT International Team (2018-19), and NUST National Science Bee 1st Place in Robowars/Roborace (2023).',
        keywords: ['awards', 'winner', 'competition', 'intel', 'teknofest', 'nust', 'roborace', 'robowars']
    },
    {
        topic: 'projects',
        content: 'Mueez has built a Wifi Deauther (IoT), P4wn Pie (Raspberry Pi), 4 DOF Arm (Arduino), AI Robot Car, and Decentralized Cloud Storage.',
        keywords: ['projects', 'wifi', 'deauther', 'robot', 'car', 'storage', 'cloud', 'arm']
    },
    {
        topic: 'contact',
        content: 'Mueez is based in Lahore, Pakistan (+92 316 4119937) and Keele, UK. Email: mueezahmad69@gmail.com.',
        keywords: ['contact', 'email', 'phone', 'location', 'lahore', 'pakistan']
    }
];

function initChatbot() {
    const chatToggle = document.getElementById('chatToggle');
    const chatbot = document.getElementById('chatbot');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatbot) return;

    chatToggle?.addEventListener('click', () => chatbot.classList.add('active'));
    document.getElementById('chatbotClose')?.addEventListener('click', () => chatbot.classList.remove('active'));

    function addMessage(text, isUser) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        msg.innerHTML = text; // Allow HTML for citations
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleChat() {
        const query = chatInput.value.trim().toLowerCase();
        if (!query) return;

        addMessage(query, true);
        chatInput.value = '';

        // Simulated RAG Processing
        addMessage('<span style="opacity:0.5"><i>Analyzing knowledge base...</i></span>', false);
        const thinkingMsg = chatMessages.lastChild;

        setTimeout(() => {
            let bestMatch = null;
            let maxOverlap = 0;

            KNOWLEDGE_BASE.forEach(doc => {
                let overlap = 0;
                doc.keywords.forEach(kw => { if (query.includes(kw)) overlap++; });
                if (overlap > maxOverlap) {
                    maxOverlap = overlap;
                    bestMatch = doc;
                }
            });

            // Milestone 3: NeuralCore Sentiment Analysis
            if (window.neuralCore) window.neuralCore.analyzeSentiment(query);

            thinkingMsg.remove();
            if (bestMatch) {
                addMessage(`${bestMatch.content}<br><br><small style="color:var(--accent)">[Source: Mueez_Portfolio_v2.doc]</small>`, false);
            } else {
                addMessage("I couldn't find a specific match in my local knowledge base. Would you like me to ping Mueez directly via email?", false);
            }
        }, 800);
    }

    chatSend?.addEventListener('click', handleChat);
    chatInput?.addEventListener('keypress', (e) => e.key === 'Enter' && handleChat());
}

// --- Milestone 1 & 2 Features (Restored & Optimized) ---

async function fetchCommits(repo) {
    if (!repo) return [];
    try {
        const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=5`);
        return await res.json();
    } catch (e) { return []; }
}

function initProjectInteractions() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', async () => {
            const title = card.querySelector('.project-title')?.textContent || 'Project';
            const body = card.querySelector('.project-body p')?.innerHTML || '';
            const tags = card.querySelector('.tech-tags')?.innerHTML || '';
            const repo = card.getAttribute('data-repo');
            const architecture = card.getAttribute('data-architecture');
            showMangaReader(title, body, tags, repo, architecture);
        });
    });
}

async function showMangaReader(title, body, tags, repo, architecture) {
    let modal = document.getElementById('manga-reader');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'manga-reader';
        modal.className = 'manga-panel active';
        modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10001; width: 95%; max-width: 900px; max-height: 90vh; overflow-y: auto; display: block; border: 3px solid var(--border);';
        modal.innerHTML = `
            <div class="panel-corner top-left"></div><div class="panel-corner top-right"></div>
            <div class="panel-corner bottom-left"></div><div class="panel-corner bottom-right"></div>
            <button id="reader-close" style="position: absolute; right: 1rem; top: 1rem; border: 3px solid var(--border); background: var(--accent); color: white; cursor: pointer; padding: 0.5rem; z-index: 10;">X</button>
            <h2 class="section-title" id="reader-title"></h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 1rem;">
                <div>
                    <h4 style="font-family: 'JetBrains Mono', monospace; margin-bottom: 1rem; color: var(--accent);">[ OVERVIEW ]</h4>
                    <div class="speech-bubble" id="reader-body" style="margin: 0; max-width: none;"></div>
                    <div class="tech-tags" id="reader-tags" style="margin-top: 1rem;"></div>
                </div>
                <div>
                    <h4 style="font-family: 'JetBrains Mono', monospace; margin-bottom: 1rem; color: var(--accent);">[ ARCHITECTURE ]</h4>
                    <div id="architecture-diagram" class="mermaid" style="background: white; padding: 1rem; border-radius: 4px;"></div>
                </div>
            </div>
            <div id="time-machine" style="border-top: 3px solid var(--border); padding: 2rem; margin-top: 1rem;">
                <h4 style="font-family: 'JetBrains Mono', monospace; margin-bottom: 1rem; color: var(--accent);">🕒 COMMIT TIME MACHINE</h4>
                <div id="commit-list" style="font-size: 0.85rem; font-family: 'JetBrains Mono', monospace;">Loading history...</div>
            </div>
        `;
        document.body.appendChild(modal);
        const overlay = document.createElement('div');
        overlay.id = 'reader-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 10000;';
        document.body.appendChild(overlay);
        overlay.onclick = closeReader;
        document.getElementById('reader-close').onclick = closeReader;
    }
    
    document.getElementById('reader-title').textContent = title;
    document.getElementById('reader-body').innerHTML = body;
    document.getElementById('reader-tags').innerHTML = tags;
    
    const diagDiv = document.getElementById('architecture-diagram');
    if (architecture) {
        diagDiv.style.display = 'block';
        diagDiv.innerHTML = architecture;
        diagDiv.removeAttribute('data-processed');
        mermaid.contentLoaded();
    } else { diagDiv.style.display = 'none'; }

    document.getElementById('manga-reader').style.display = 'block';
    document.getElementById('reader-overlay').style.display = 'block';

    const commitList = document.getElementById('commit-list');
    commitList.innerHTML = 'Scanning timeline...';
    if (repo) {
        const commits = await fetchCommits(repo);
        if (commits.length > 0) {
            commitList.innerHTML = commits.map(c => `
                <div style="margin-bottom: 0.8rem; border-left: 2px solid var(--accent); padding-left: 1rem;">
                    <div style="color: var(--accent); font-weight: 700;">${new Date(c.commit.author.date).toLocaleDateString()}</div>
                    <div>${c.commit.message}</div>
                </div>
            `).join('');
        } else { commitList.innerHTML = 'Timeline restricted or repository private.'; }
    } else { commitList.innerHTML = 'No repository linked.'; }
}

function closeReader() {
    document.getElementById('manga-reader').style.display = 'none';
    document.getElementById('reader-overlay').style.display = 'none';
}

function initDevMode() {
    let keys = '';
    window.addEventListener('keydown', (e) => {
        keys += e.key.toLowerCase();
        if (keys.endsWith('dev')) { document.body.classList.toggle('binary-mode'); keys = ''; }
        if (keys.length > 10) keys = keys.slice(-3);
    });
}

function initVoiceControl() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (command.includes('home')) window.scrollTo({ top: 0, behavior: 'smooth' });
        if (command.includes('projects')) document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('dblclick', () => recognition.start());
}

// CORE HELPERS
function initLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) window.addEventListener('load', () => setTimeout(() => overlay.classList.add('hidden'), 1000));
}

function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;
    body.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
    toggle?.addEventListener('click', () => {
        const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: next } }));
    });
}

function initLanguage() {
    const toggle = document.getElementById('langToggle');
    const body = document.body;
    body.className = body.className.replace(/lang-\w+/, '') + ` lang-${localStorage.getItem('lang') || 'en'}`;
    toggle?.addEventListener('click', () => {
        const next = body.classList.contains('lang-jp') ? 'en' : 'jp';
        body.className = body.className.replace(/lang-\w+/, '') + ` lang-${next}`;
        localStorage.setItem('lang', next);
        toggle.textContent = next.toUpperCase();
    });
}

function initSpeedLines() {
    const container = document.getElementById('speedLines');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.cssText = `width:${Math.random()*2+1}px; height:${Math.random()*500+200}px; left:${Math.random()*100}%; top:${Math.random()*100}%; transform:rotate(${Math.random()*360}deg); position:absolute; background:var(--border); opacity:0.05;`;
        container.appendChild(line);
    }
}

function initMusicPlayer() {
    const playBtn = document.getElementById('musicPlay');
    const canvas = document.getElementById('visualizer');
    if (!playBtn || !canvas) return;
    const audio = new Audio('https://stream.zeno.fm/0r0xa792kwzuv');
    audio.crossOrigin = "anonymous";
    let isInit = false, analyser, dataArray;
    playBtn.onclick = () => {
        if (!isInit) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = ctx.createAnalyser();
            const src = ctx.createMediaElementSource(audio);
            src.connect(analyser); analyser.connect(ctx.destination);
            analyser.fftSize = 64; dataArray = new Uint8Array(analyser.frequencyBinCount);
            isInit = true; 
            const draw = () => {
                requestAnimationFrame(draw); analyser.getByteFrequencyData(dataArray);
                const c = canvas.getContext('2d'); c.clearRect(0, 0, canvas.width, canvas.height);
                const bar = (canvas.width / dataArray.length) * 2.5; let x = 0;
                const col = getComputedStyle(document.body).getPropertyValue('--accent');
                for (let i = 0; i < dataArray.length; i++) {
                    const h = (dataArray[i] / 255) * canvas.height;
                    c.fillStyle = col; c.fillRect(x, canvas.height - h, bar - 1, h);
                    x += bar;
                }
            }; draw();
        }
        audio.paused ? audio.play() : audio.pause();
        playBtn.textContent = audio.paused ? '▶' : '⏸';
    };
}

function initWeather() { if (document.getElementById('weatherTemp')) document.getElementById('weatherTemp').textContent = '18°C'; }
function initScrollEffects() {
    const st = document.getElementById('scrollTop');
    window.onscroll = () => st?.classList.toggle('visible', window.pageYOffset > 300);
    st && (st.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
async function initGitHubStats() { if (document.querySelector('#stat-commits .stat-number')) document.querySelector('#stat-commits .stat-number').textContent = '850+'; }
function initTerminal() { if (document.getElementById('terminal-content')) document.getElementById('terminal-content').innerHTML += '<div class="terminal-line">> SRE_CORE_BOOTED [OK]</div>'; }

// SRE Health Monitoring
function initSREHealth() {
    const updateHealth = () => {
        const services = ['api', 'ecommerce'];
        services.forEach(service => {
            const statusEl = document.getElementById(`status-${service}`);
            const latencyEl = document.getElementById(`latency-${service}`);
            if (statusEl && latencyEl) {
                const latency = Math.floor(Math.random() * 50) + 10;
                latencyEl.textContent = `${latency} ms`;
                statusEl.style.background = latency < 100 ? '#00ff00' : '#ffaa00';
            }
        });
        const logEl = document.getElementById('sre-logs');
        if (logEl) {
            const logs = ['Health check passed', 'Latency nominal', 'All endpoints responding', 'Cache hit rate: 98%'];
            const randomLog = logs[Math.floor(Math.random() * logs.length)];
            logEl.innerHTML += `<div>> ${randomLog}</div>`;
            logEl.scrollTop = logEl.scrollHeight;
        }
    };
    setInterval(updateHealth, 5000);
    updateHealth();
}

// Guestbook Functionality
function initGuestbook() {
    const form = document.getElementById('contactForm');
    const wall = document.getElementById('guestbook-wall');
    if (!form || !wall) return;

    const messages = JSON.parse(localStorage.getItem('guestbook-messages') || '[]');
    messages.forEach(msg => addGuestbookMessage(msg.name, msg.message, wall));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const message = form.message.value.trim();
        if (name && message) {
            addGuestbookMessage(name, message, wall);
            messages.push({ name, message, date: new Date().toISOString() });
            localStorage.setItem('guestbook-messages', JSON.stringify(messages));
            form.reset();
        }
    });
}

function addGuestbookMessage(name, message, wall) {
    const div = document.createElement('div');
    div.style.marginBottom = '0.5rem';
    div.innerHTML = `<strong>${name}:</strong> ${message}`;
    wall.appendChild(div);
    wall.scrollTop = wall.scrollHeight;
}

// Blockchain Simulation
function initBlockchainSim() {
    const mineBtn = document.getElementById('mine-block');
    const list = document.getElementById('blockchain-list');
    if (!mineBtn || !list) return;

    let blockHeight = 0;
    mineBtn.addEventListener('click', () => {
        blockHeight++;
        const hash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        const prevHash = blockHeight > 1 ? list.lastChild.textContent.split('→')[1].trim() : 'GENESIS';
        const div = document.createElement('div');
        div.className = 'terminal-line';
        div.style.fontSize = '0.7rem';
        div.innerHTML = `BLOCK ${blockHeight} [HASH: ${hash.substring(0, 10)}...] → ${prevHash}`;
        list.appendChild(div);
        list.scrollTop = list.scrollHeight;
    });
}

// JWT Debugger
function initJWTDebugger() {
    const input = document.getElementById('jwt-input');
    const output = document.getElementById('jwt-output');
    if (!input || !output) return;

    input.addEventListener('input', () => {
        const token = input.value.trim();
        if (!token) {
            output.textContent = 'Awaiting valid JWT structure...';
            return;
        }
        try {
            const parts = token.split('.');
            if (parts.length !== 3) throw new Error('Invalid JWT');
            const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            output.innerHTML = `<div style="color:#00ff00">Header:</div><pre>${JSON.stringify(header, null, 2)}</pre><div style="color:#00ff00">Payload:</div><pre>${JSON.stringify(payload, null, 2)}</pre>`;
        } catch (e) {
            output.textContent = 'Invalid JWT format';
        }
    });
}
