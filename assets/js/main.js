// ===== NeuralOS Core Kernel v2.1.4 - Advanced Distribution =====

const NeuralSystem = {
    audio: {
        click: document.getElementById('snd-click'),
        hover: document.getElementById('snd-hover'),
        sys: document.getElementById('snd-sys'),
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
        this.initWidgets();
        this.initSystemStats();
        this.initCharts();
        this.initCommandPalette();
        this.initHolograms();
        this.initParallax();
        this.initSolarSync();
        this.initMusicPlayer();
        this.initAI();
        this.initSoundscapes();
        console.log('NeuralOS Kernel [ULTIMATE] v2.1.4 Initialized');
    },

    initSoundscapes() {
        document.addEventListener('mousedown', () => this.audio.play('click'));
        document.querySelectorAll('button, a, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => this.audio.play('hover'));
        });
    },

    initCharts() {
        const ctx = document.getElementById('sysChart')?.getContext('2d');
        if (!ctx) return;

        this.charts = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(10).fill(''),
                datasets: [{
                    label: 'CORE_LOAD',
                    data: Array(10).fill(0),
                    borderColor: '#00f7ff',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(0, 247, 255, 0.1)',
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, min: 0, max: 100 }
                }
            }
        });
    },

    initSystemStats() {
        let startTime = Date.now();
        setInterval(() => {
            const cpu = Math.floor(Math.random() * 20) + 10;
            const mem = 40 + Math.floor(Math.random() * 5);
            
            if (this.charts) {
                this.charts.data.datasets[0].data.push(cpu);
                this.charts.data.datasets[0].data.shift();
                this.charts.update('none');
            }

            document.getElementById('cpuLoad').textContent = `${cpu}%`;
            document.getElementById('cpuBar').style.width = `${cpu}%`;
            document.getElementById('memLoad').textContent = `${mem}%`;
            document.getElementById('memBar').style.width = `${mem}%`;
            
            const diff = Math.floor((Date.now() - startTime) / 1000);
            const h = String(Math.floor(diff / 3600)).padStart(2, '0');
            const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
            const s = String(diff % 60).padStart(2, '0');
            document.getElementById('sysUptime').textContent = `UPTIME: ${h}:${m}:${s}`;
        }, 1500);
    },

    initHolograms() {
        const container = document.getElementById('hologram-overlay');
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.spawnHologram(card);
            });
            card.addEventListener('mouseleave', () => {
                this.removeHologram();
            });
        });
    },

    spawnHologram(card) {
        const container = document.getElementById('hologram-overlay');
        container.innerHTML = '';
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Create Wireframe Box
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00f7ff }));
        scene.add(line);

        camera.position.z = 2;

        const animate = () => {
            this.hologramReq = requestAnimationFrame(animate);
            line.rotation.x += 0.01;
            line.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // GSAP Follow Mouse
        document.addEventListener('mousemove', (e) => {
            gsap.to(line.position, {
                x: (e.clientX / window.innerWidth) * 4 - 2,
                y: -(e.clientY / window.innerHeight) * 4 + 2,
                duration: 0.5
            });
        });
    },

    removeHologram() {
        cancelAnimationFrame(this.hologramReq);
        const container = document.getElementById('hologram-overlay');
        container.innerHTML = '';
    },

    initParallax() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            
            gsap.to('.glass-panel', {
                rotationY: x,
                rotationX: -y,
                transformPerspective: 1000,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    },

    initSolarSync() {
        const hour = new Date().getHours();
        const body = document.body;
        
        if (hour >= 6 && hour < 17) { // Day: Silver
            body.style.setProperty('--accent-cyan', '#00f7ff');
        } else if (hour >= 17 && hour < 20) { // Sunset: Copper
            body.style.setProperty('--accent-cyan', '#ff7b00');
            body.style.setProperty('--accent-blue', '#ff4d00');
        } else { // Night: Deep Blue
            body.style.setProperty('--accent-cyan', '#00aaff');
        }
    },

    initAI() {
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const chatMessages = document.getElementById('chatMessages');

        const sendMessage = async () => {
            const msg = chatInput.value.trim();
            if (!msg) return;

            this.addChatMessage(msg, true);
            chatInput.value = '';

            // Simulated Streaming AI
            const response = await this.fetchAIResponse(msg);
            this.streamChatMessage(response);
        };

        chatSend?.addEventListener('click', sendMessage);
        chatInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    },

    async fetchAIResponse(msg) {
        // In a real implementation, this would call your serverless function
        // For static, we use a highly sophisticated simulation or direct API if key exists
        return "NEURAL_OS v2.1: Analysing request... Target identified as '" + msg + "'. Mueez Ahmed's expertise in Full-Stack and AI Architecture is ready for deployment. How would you like to proceed?";
    },

    addChatMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        msgDiv.textContent = text;
        document.getElementById('chatMessages').appendChild(msgDiv);
        msgDiv.scrollIntoView({ behavior: 'smooth' });
    },

    streamChatMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        document.getElementById('chatMessages').appendChild(msgDiv);
        
        let i = 0;
        const interval = setInterval(() => {
            msgDiv.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
            document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
        }, 20);
    },

    initMusicPlayer() {
        const playBtn = document.getElementById('musicPlay');
        const titleEl = document.getElementById('musicTitle');
        // Real stream API integration
        const audio = new Audio('https://icecast2.ufpel.edu.br/live'); 
        let isPlaying = false;

        playBtn?.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
    },

    // UI Helpers
    initLoading() {
        window.addEventListener('load', () => {
            gsap.to('#loadingOverlay', { opacity: 0, duration: 1, delay: 1, onComplete: () => {
                document.getElementById('loadingOverlay').style.display = 'none';
            }});
        });
    },

    toggleWidget(id) {
        const widget = document.getElementById(id);
        if (!widget) return;
        const isHidden = widget.style.display === 'none';
        
        if (isHidden) {
            widget.style.display = 'block';
            gsap.fromTo(widget, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 });
        } else {
            gsap.to(widget, { opacity: 0, y: 20, scale: 0.9, duration: 0.4, onComplete: () => {
                widget.style.display = 'none';
            }});
        }
    },

    initWidgets() {
        window.toggleWidget = this.toggleWidget;
    },

    initTheme() {
        const toggle = document.getElementById('themeToggle');
        toggle?.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });
    },

    initCommandPalette() {
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                alert('COMMAND_PALETTE: ACCESS_DENIED. Kernel upgrade required.');
            }
        });
    }
};

NeuralSystem.init();
