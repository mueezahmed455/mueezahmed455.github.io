// ===== NeuralOS Observability Suite =====

class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.memory = 0;
        this.latency = 0;
        this.frames = 0;
        this.lastTime = performance.now();
        
        this.initUI();
        this.startTracking();
    }

    initUI() {
        const container = document.createElement('div');
        container.id = 'perf-monitor';
        container.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            padding: 8px;
            border: 1px solid #00ff00;
            z-index: 100000;
            pointer-events: none;
            display: none;
            text-transform: uppercase;
        `;
        container.innerHTML = `
            <div>SYS_FPS: <span id="perf-fps">--</span></div>
            <div>SYS_MEM: <span id="perf-mem">--</span></div>
            <div>SYS_LAT: <span id="perf-lat">--</span></div>
            <div style="margin-top: 4px; border-top: 1px solid #00ff00; padding-top: 4px;">
                STATUS: <span style="color: #00ff00">NOMINAL</span>
            </div>
        `;
        document.body.appendChild(container);

        // Hidden Shortcut: Type 'perf' to toggle
        let keys = '';
        window.addEventListener('keydown', (e) => {
            keys += e.key.toLowerCase();
            if (keys.endsWith('perf')) {
                container.style.display = container.style.display === 'none' ? 'block' : 'none';
                keys = '';
            }
            if (keys.length > 10) keys = keys.slice(-4);
        });
    }

    startTracking() {
        const update = () => {
            this.frames++;
            const currentTime = performance.now();
            
            if (currentTime >= this.lastTime + 1000) {
                this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
                this.frames = 0;
                this.lastTime = currentTime;
                this.updateUI();
            }
            requestAnimationFrame(update);
        };
        update();

        // Track Network Latency
        setInterval(async () => {
            const start = performance.now();
            try {
                await fetch(window.location.href, { method: 'HEAD', cache: 'no-cache' });
                this.latency = Math.round(performance.now() - start);
            } catch (e) {
                this.latency = 0;
            }
        }, 5000);
    }

    updateUI() {
        const fpsEl = document.getElementById('perf-fps');
        const memEl = document.getElementById('perf-mem');
        const latEl = document.getElementById('perf-lat');

        if (fpsEl) fpsEl.textContent = this.fps;
        if (latEl) latEl.textContent = `${this.latency}MS`;
        
        if (memEl && performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
            memEl.textContent = `${used}MB`;
        } else if (memEl) {
            memEl.textContent = 'N/A';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.neuralMonitor = new PerformanceMonitor();
});
