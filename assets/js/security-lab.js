// ===== NeuralOS Security & Distributed Lab =====

class SecurityLab {
    constructor() {
        this.blockchain = [];
        this.init();
    }

    init() {
        this.initBlockchain();
        this.initJWTDebugger();
    }

    // --- Blockchain Simulation ---
    async initBlockchain() {
        const btn = document.getElementById('mine-block');
        const list = document.getElementById('blockchain-list');
        if (!btn) return;

        btn.onclick = async () => {
            const name = prompt('Enter your name to sign the block:') || 'Anonymous';
            const prevHash = this.blockchain.length > 0 ? this.blockchain[this.blockchain.length-1].hash : '0000000000000000';
            
            const block = {
                index: this.blockchain.length,
                timestamp: Date.now(),
                data: `Block signed by ${name}`,
                prevHash: prevHash,
                nonce: 0,
                hash: ''
            };

            btn.textContent = 'MINING...';
            block.hash = await this.mine(block);
            this.blockchain.push(block);
            
            const item = document.createElement('div');
            item.className = 'terminal-line';
            item.style.fontSize = '0.7rem';
            item.innerHTML = `BLOCK_${block.index} [HASH: ${block.hash.substring(0,16)}...]`;
            list.appendChild(item);
            btn.textContent = 'MINE NEW BLOCK';
        };
    }

    async mine(block) {
        let hash = '';
        while (!hash.startsWith('000')) { // Proof of Work difficulty
            block.nonce++;
            const msg = JSON.stringify(block);
            const msgUint8 = new TextEncoder().encode(msg);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        return hash;
    }

    // --- JWT Debugger ---
    initJWTDebugger() {
        const input = document.getElementById('jwt-input');
        const output = document.getElementById('jwt-output');
        if (!input) return;

        input.oninput = () => {
            try {
                const parts = input.value.split('.');
                if (parts.length !== 3) throw new Error('Invalid JWT format');
                
                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));
                
                output.innerHTML = `
                    <div style="color: #fb3b1e;">HEADER: ${JSON.stringify(header)}</div>
                    <div style="color: #d63aff;">PAYLOAD: ${JSON.stringify(payload)}</div>
                    <div style="color: #00ff00;">SIGNATURE: VERIFIED_LOCAL_SIM</div>
                `;
            } catch (e) {
                output.textContent = 'Awaiting valid JWT structure...';
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.neuralSecurity = new SecurityLab();
});
