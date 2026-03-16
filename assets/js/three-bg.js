let scene, camera, renderer, particles;

function initThree() {
    const container = document.body;
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    // Create particles
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        // Colors based on theme (will update in loop)
        colors[i * 3] = 0.8;
        colors[i * 3 + 1] = 0.1;
        colors[i * 3 + 2] = 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.4
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0005;
    particles.rotation.y = time * 0.1;
    particles.rotation.x = time * 0.05;

    // Pulse effect
    const scale = 1 + Math.sin(time) * 0.1;
    particles.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initThree();
    updateParticleColors();
});

// Update colors based on current theme
function updateParticleColors() {
    if (!particles) return;
    
    const theme = document.body.getAttribute('data-theme');
    const colors = particles.geometry.attributes.color.array;
    
    let r, g, b;
    if (theme === 'dark') {
        r = 1.0; g = 0.4; b = 0.4; // Soft red
    } else if (theme === 'cyberpunk') {
        r = 1.0; g = 0.0; b = 1.0; // Magenta
    } else if (theme === 'vintage') {
        r = 0.5; g = 0.2; b = 0.0; // Sepia/Rust
    } else {
        r = 0.8; g = 0.1; b = 0.1; // Deep red
    }

    for (let i = 0; i < colors.length / 3; i++) {
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
    }
    
    particles.geometry.attributes.color.needsUpdate = true;
}

// Observer to watch for theme changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            updateParticleColors();
        }
    });
});

observer.observe(document.body, { attributes: true });
