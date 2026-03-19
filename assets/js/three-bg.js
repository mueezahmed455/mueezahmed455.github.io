// ===== NeuralOS Liquid Metal Background Engine =====

let scene, camera, renderer, material, mesh;
let mouse = new THREE.Vector2(0.5, 0.5);
let targetMouse = new THREE.Vector2(0.5, 0.5);

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1.5;

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

    const geometry = new THREE.PlaneGeometry(5, 5, 128, 128);
    material = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 1.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
        },
        vertexShader: `
            varying vec2 vUv;
            varying float vDistortion;
            uniform float u_time;
            uniform vec2 u_mouse;

            // Simplex 3D Noise 
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

            float snoise(vec3 v) {
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 =   v - i + dot(i, C.xxx) ;
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;
                i = mod289(i);
                vec4 p = permute( permute( permute(
                           i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                         + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                         + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                float n_ = 0.142857142857;
                vec3  ns = n_ * D.wyz - D.xzx;
                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );
                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);
                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));
                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                              dot(p2,x2), dot(p3,x3) ) );
            }

            void main() {
                vUv = uv;
                float noise = snoise(vec3(position.x * 0.5, position.y * 0.5, u_time * 0.1));
                float dist = distance(uv, u_mouse);
                float strength = 0.3 / (dist + 0.5);
                
                vDistortion = noise * 0.5 + strength * 0.2;
                vec3 pos = position;
                pos.z += vDistortion;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            varying float vDistortion;
            uniform float u_time;

            void main() {
                // Liquid Metal Appearance
                vec3 color1 = vec3(0.0, 0.96, 1.0); // Cyan
                vec3 color2 = vec3(0.0, 0.43, 1.0); // Blue
                
                float mixFactor = vDistortion * 2.0 + 0.5;
                vec3 finalColor = mix(color1, color2, clamp(mixFactor, 0.0, 1.0));
                
                // Add metallic specular highlights
                float highlight = pow(max(0.0, vDistortion), 3.0) * 2.0;
                finalColor += vec3(highlight);
                
                gl_FragColor = vec4(finalColor, 0.05 + vDistortion * 0.1);
            }
        `,
        transparent: true,
        wireframe: false
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
        material.uniforms.u_time.value += 0.01;
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;
        material.uniforms.u_mouse.value.copy(mouse);
        
        mesh.rotation.z += 0.001;
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', initThree);
