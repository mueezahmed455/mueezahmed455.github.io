// ===== Manga Portfolio Three.js Shader Engine =====

let scene, camera, renderer, material, mesh;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    // Custom Shader Material
    const geometry = new THREE.PlaneGeometry(2, 2);
    material = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 1.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_color: { value: new THREE.Color(0xd32f2f) }, // Default accent
            u_scroll: { value: 0.0 }
        },
        vertexShader: `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec3 u_color;
            uniform float u_scroll;

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                uv.y += u_scroll * 0.5;
                
                float d = 0.0;
                vec2 st = uv * 10.0;
                
                // Manga speed line effect via shader
                float line = step(0.95, fract(st.x + u_time * 0.2));
                float noise = fract(sin(dot(uv.xy ,vec2(12.9898,78.233))) * 43758.5453);
                
                vec3 finalColor = u_color * line * noise * 0.3;
                gl_FragColor = vec4(finalColor, 0.1);
            }
        `,
        transparent: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (material) {
        material.uniforms.u_time.value += 0.05;
        material.uniforms.u_scroll.value = window.pageYOffset / 1000;
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});

window.addEventListener('themeChanged', (e) => {
    const theme = e.detail.theme;
    let color = new THREE.Color(0xd32f2f); // Light/Red
    if (theme === 'dark') color = new THREE.Color(0xff6b6b);
    if (theme === 'cyberpunk') color = new THREE.Color(0x00ff00);
    if (material) material.uniforms.u_color.value = color;
});

document.addEventListener('DOMContentLoaded', initThree);
