// ===== NeuralOS Multiplayer & Real-time Presence =====

class MultiplayerEngine {
    constructor() {
        this.visitors = new Map();
        this.myId = Math.random().toString(36).substring(7);
        this.container = document.createElement('div');
        this.container.id = 'multiplayer-cursors';
        this.container.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:1000000;';
        document.body.appendChild(this.container);
        
        this.init();
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            const pos = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            };
            this.broadcast('MOVE', pos);
        });

        // Simulated Real-time Loop (Ready for Supabase/Pusher)
        setInterval(() => {
            if (Math.random() > 0.8) {
                this.simulateVisitor();
            }
        }, 4000);
    }

    broadcast(type, data) {
        // Here you would plug in Supabase:
        // supabase.channel('presence').send({ type, id: this.myId, data });
        
        // For the demo, we trigger a globe ping locally
        if (window.neuralGlobePing) window.neuralGlobePing();
    }

    simulateVisitor() {
        const id = 'visitor_' + Math.random().toString(36).substring(9);
        const cursor = document.createElement('div');
        cursor.className = 'remote-cursor';
        cursor.style.cssText = `
            position: absolute;
            width: 12px;
            height: 12px;
            background: var(--accent);
            border-radius: 50%;
            transition: all 0.8s ease;
            box-shadow: 0 0 10px var(--accent);
        `;
        const label = document.createElement('span');
        label.textContent = id;
        label.style.cssText = 'position:absolute; top:15px; left:15px; font-size:8px; font-family:JetBrains Mono; color:var(--accent); white-space:nowrap;';
        cursor.appendChild(label);
        this.container.appendChild(cursor);

        let moves = 0;
        const interval = setInterval(() => {
            cursor.style.left = Math.random() * 100 + 'vw';
            cursor.style.top = Math.random() * 100 + 'vh';
            moves++;
            if (moves > 5) {
                cursor.remove();
                clearInterval(interval);
            }
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.neuralMultiplayer = new MultiplayerEngine();
});
