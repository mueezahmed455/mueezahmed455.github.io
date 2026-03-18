// ===== NeuralOS GPU Fluid Simulation Engine =====

let scene, camera, renderer, material, mesh;
let mouse = new THREE.Vector2(0.5, 0.5);
let targetMouse = new THREE.Vector2(0.5, 0.5);

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const geometry = new THREE.PlaneGeometry(2, 2);
    material = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 1.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_color: { value: new THREE.Color(0xd32f2f) },
            u_scroll: { value: 0.0 },
            u_intensity: { value: 0.2 }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform vec3 u_color;
            uniform float u_scroll;
            uniform float u_intensity;
            varying vec2 vUv;

            // Simplex noise for fluid motion
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ; m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                float dist = distance(uv, u_mouse);
                float strength = 0.5 / (dist + 0.5);
                
                // Fluid-like distortion
                float n = snoise(uv * 3.0 + u_time * 0.1);
                vec2 displacement = vec2(snoise(uv + u_time * 0.05), snoise(uv - u_time * 0.05)) * 0.05;
                
                // Manga speed lines integration
                float line = step(0.98, fract(uv.x * 10.0 + u_time * 0.2 + displacement.x));
                
                // Mouse interaction glow
                float mGlow = smoothstep(0.2, 0.0, dist) * u_intensity;
                
                vec3 finalColor = u_color * (line + n * 0.1 + mGlow);
                gl_FragColor = vec4(finalColor, 0.08);
            }
        `,
        transparent: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    window.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (material) {
        material.uniforms.u_time.value += 0.02;
        material.uniforms.u_scroll.value = window.pageYOffset / 1000;
        
        // Smooth mouse following
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;
        material.uniforms.u_mouse.value.copy(mouse);
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
    let color = new THREE.Color(0xd32f2f);
    if (theme === 'dark') color = new THREE.Color(0xff6b6b);
    if (theme === 'cyberpunk') color = new THREE.Color(0x00ff00);
    if (material) material.uniforms.u_color.value = color;
});

document.addEventListener('DOMContentLoaded', initThree);
