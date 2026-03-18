// ===== NeuralOS Terminal Kernel & VFS =====

class TerminalKernel {
    constructor() {
        this.fs = {
            '/': ['projects', 'about.txt', 'contact.txt', 'README.md'],
            '/projects': ['ai-car', 'storage-hub', 'ecommerce', 'gateway'],
            '/projects/ai-car': ['specs.md', 'code.py'],
            '/projects/storage-hub': ['specs.md', 'architecture.png']
        };
        this.currentDir = '/';
        this.isSSH = false;
        this.init();
    }

    init() {
        const termInput = document.getElementById('terminal-input'); // We'll add this to index.md terminal
        if (!termInput) return;

        termInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim();
                this.execute(cmd);
                termInput.value = '';
            }
        });
    }

    execute(input) {
        const [cmd, ...args] = input.split(' ');
        const outputEl = document.getElementById('terminal-content');
        if (!outputEl) return;

        const print = (text, color = '') => {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.style.color = color;
            line.innerHTML = `<span class="terminal-prompt">></span> ${text}`;
            outputEl.appendChild(line);
            outputEl.scrollTop = outputEl.scrollHeight;
        };

        switch (cmd.toLowerCase()) {
            case 'help':
                print('Available: ls, cd, cat, ssh, clear, whoami, neofetch');
                break;
            case 'ls':
                print(this.fs[this.currentDir].join('  '), '#00ff00');
                break;
            case 'cd':
                const target = args[0];
                if (!target || target === '~') { this.currentDir = '/'; }
                else if (target === '..') { this.currentDir = '/'; }
                else {
                    const newPath = this.currentDir === '/' ? `/${target}` : `${this.currentDir}/${target}`;
                    if (this.fs[newPath]) this.currentDir = newPath;
                    else print(`cd: ${target}: No such directory`, '#ff0000');
                }
                break;
            case 'cat':
                if (args[0] === 'about.txt') print('Mueez Ahmed: Full-Stack Engineer & AI Designer.');
                else if (args[0] === 'contact.txt') print('Email: mueezahmad69@gmail.com');
                else print('cat: File not found.', '#ff0000');
                break;
            case 'ssh':
                if (args[0] === 'guest@mueez.io') this.triggerSSH();
                else print('ssh: Permission denied.', '#ff0000');
                break;
            case 'clear':
                outputEl.innerHTML = '';
                break;
            case 'whoami':
                print('guest_user_alpha');
                break;
            case 'neofetch':
                print('OS: NeuralOS v2.0.4');
                print('Kernel: x86_64 Webkit');
                print('Uptime: 1047 hours');
                print('Shell: neural-sh');
                break;
            default:
                print(`${cmd}: command not found`, '#ff0000');
        }
    }

    triggerSSH() {
        document.body.classList.add('crt-active', 'ssh-mode');
        const container = document.getElementById('terminal');
        if (container) {
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 999999;
                margin: 0;
                border: none;
                background: black;
            `;
        }
        alert('SSH CONNECTION ESTABLISHED: SECURE_CHANNEL_READY');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.neuralKernel = new TerminalKernel();
});
