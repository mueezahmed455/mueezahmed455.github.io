// ===== PS5-Style 3D Particle Background System =====

class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, radius: 150 };
        this.particleCount = 150;
        this.connectionDistance = 120;
        this.animationId = null;
        
        this.init();
        this.addEventListeners();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 2 + 0.5, // Depth factor
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                hue: Math.random() * 60 + 180, // Cyan to blue range
                brightness: Math.random() * 30 + 70,
                alpha: Math.random() * 0.5 + 0.3,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Touch support
        window.addEventListener('touchmove', (e) => {
            this.mouse.x = e.touches[0].clientX;
            this.mouse.y = e.touches[0].clientY;
        });
    }
    
    drawParticle(particle) {
        // Pulse effect
        const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset);
        const alpha = particle.alpha * (0.7 + pulse * 0.3);
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * particle.z, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${particle.hue}, 100%, ${particle.brightness}%, ${alpha})`;
        this.ctx.fill();
        
        // Glow effect
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * particle.z * 4
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, ${particle.brightness}%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, ${particle.brightness}%, 0)`);
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * particle.z * 4, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const alpha = (1 - distance / this.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `hsla(190, 100%, 60%, ${alpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticle(particle) {
        // Mouse interaction
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
            const force = (this.mouse.radius - distance) / this.mouse.radius;
            const angle = Math.atan2(dy, dx);
            particle.x -= Math.cos(angle) * force * 2;
            particle.y -= Math.sin(angle) * force * 2;
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(2, 4, 8, 0.3)');
        gradient.addColorStop(1, 'rgba(2, 4, 8, 0.1)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize on page load
let particleBg = null;

function initParticleBackground() {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        particleBg = new ParticleBackground('particleCanvas');
    }
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (particleBg) particleBg.destroy();
});

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticleBackground);
} else {
    initParticleBackground();
}
