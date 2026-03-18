// ===== NeuralOS AI & Predictive Core =====

class NeuralCore {
    constructor() {
        this.mouseHistory = [];
        this.model = null;
        this.isTraining = false;
        this.init();
    }

    async init() {
        // Load TensorFlow.js
        if (!window.tf) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.17.0/dist/tf.min.js';
            script.onload = () => this.buildModel();
            document.head.appendChild(script);
        } else {
            this.buildModel();
        }

        window.addEventListener('mousemove', (e) => {
            this.mouseHistory.push([e.clientX / window.innerWidth, e.clientY / window.innerHeight]);
            if (this.mouseHistory.length > 20) this.mouseHistory.shift();
            this.predict();
        });
    }

    async buildModel() {
        // Simple Linear Regression model to predict next mouse position
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({ units: 16, inputShape: [40], activation: 'relu' }));
        this.model.add(tf.layers.dense({ units: 2 }));
        this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    }

    async predict() {
        if (!this.model || this.mouseHistory.length < 20) return;

        const input = tf.tensor2d([this.mouseHistory.flat()]);
        const prediction = this.model.predict(input);
        const [px, py] = await prediction.data();
        
        // If predicted position is near a major CTA, highlight it subtly
        this.checkIntersections(px, py);
        
        input.dispose();
        prediction.dispose();
    }

    checkIntersections(x, y) {
        const cta = document.querySelector('.chat-toggle');
        if (!cta) return;

        const rect = cta.getBoundingClientRect();
        const nx = x * window.innerWidth;
        const ny = y * window.innerHeight;

        if (nx > rect.left - 50 && nx < rect.right + 50 && ny > rect.top - 50 && ny < rect.bottom + 50) {
            cta.style.boxShadow = '0 0 30px var(--accent)';
        } else {
            cta.style.boxShadow = 'none';
        }
    }

    // Call this from the chatbot logic
    analyzeSentiment(text) {
        const positive = ['good', 'great', 'awesome', 'impressive', 'cool', 'love'];
        const aggressive = ['bad', 'slow', 'error', 'fail', 'broken', 'hard'];
        
        let score = 0;
        positive.forEach(w => { if (text.includes(w)) score++; });
        aggressive.forEach(w => { if (text.includes(w)) score--; });

        if (score > 0) this.setAtmosphere('stable');
        else if (score < 0) this.setAtmosphere('alert');
    }

    setAtmosphere(mode) {
        if (mode === 'alert') {
            document.body.style.setProperty('--accent', '#ff0000');
            document.body.style.setProperty('--accent-glow', '0 0 30px rgba(255, 0, 0, 0.8)');
        } else {
            document.body.style.setProperty('--accent', '#d32f2f');
            document.body.style.setProperty('--accent-glow', '0 0 15px rgba(211, 47, 47, 0.5)');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.neuralCore = new NeuralCore();
});
