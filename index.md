---
layout: default
title: Home
---

<!-- Hero Section -->
<section class="hero" id="home">
    <div class="hero-bg">
        <canvas class="hero-canvas" id="heroCanvas"></canvas>
    </div>
    <div class="hero-content">
        <div class="hero-badge">
            <span class="status-dot"></span>
            <span>SYSTEM ONLINE</span>
        </div>
        <h1 class="hero-title glitch-title" data-text="MUEEZ AHMED">MUEEZ AHMED</h1>
        <p class="hero-subtitle">Full-Stack Engineer • Cloud Architect • AI Systems Designer</p>
        <p class="hero-description">
            Building scalable systems, intelligent applications, and next-generation digital experiences. 
            Currently architecting solutions at the intersection of cloud computing and artificial intelligence.
        </p>
        <div class="hero-buttons">
            <button class="btn btn-primary" onclick="document.getElementById('projects').scrollIntoView({behavior: 'smooth'})">
                <i class="fas fa-rocket"></i>
                <span>View Projects</span>
            </button>
            <button class="btn btn-secondary" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">
                <i class="fas fa-envelope"></i>
                <span>Contact Me</span>
            </button>
        </div>
        <div class="hero-stats">
            <div class="stat-item">
                <div class="stat-number" id="statGpa">3.8</div>
                <div class="stat-label">GPA</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="statProjects">20+</div>
                <div class="stat-label">Projects</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="statCommits">--</div>
                <div class="stat-label">Commits</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">2028</div>
                <div class="stat-label">Grad Year</div>
            </div>
        </div>
    </div>
</section>

<!-- Skills Section -->
<section id="skills">
    <div class="section-header">
        <div class="section-tag">
            <i class="fas fa-microchip"></i>
            <span>Capabilities</span>
        </div>
        <h2 class="section-title">TECHNICAL ARSENAL</h2>
        <p class="section-subtitle">A comprehensive toolkit for building modern digital solutions</p>
    </div>
    <div class="skills-grid">
        <div class="skill-card glass-panel">
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="fas fa-code"></i>
                </div>
                <div>
                    <div class="skill-name">Frontend Development</div>
                    <div class="skill-level">Advanced</div>
                </div>
            </div>
            <div class="skill-items">
                <span class="skill-tag">React.js</span>
                <span class="skill-tag">Next.js</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">Three.js</span>
                <span class="skill-tag">WebGL</span>
                <span class="skill-tag">Tailwind CSS</span>
            </div>
        </div>
        <div class="skill-card glass-panel">
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="fas fa-server"></i>
                </div>
                <div>
                    <div class="skill-name">Backend Systems</div>
                    <div class="skill-level">Expert</div>
                </div>
            </div>
            <div class="skill-items">
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">FastAPI</span>
                <span class="skill-tag">PostgreSQL</span>
                <span class="skill-tag">MongoDB</span>
                <span class="skill-tag">Redis</span>
            </div>
        </div>
        <div class="skill-card glass-panel">
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="fas fa-cloud"></i>
                </div>
                <div>
                    <div class="skill-name">Cloud Architecture</div>
                    <div class="skill-level">Advanced</div>
                </div>
            </div>
            <div class="skill-items">
                <span class="skill-tag">AWS</span>
                <span class="skill-tag">Docker</span>
                <span class="skill-tag">Kubernetes</span>
                <span class="skill-tag">CI/CD</span>
                <span class="skill-tag">Terraform</span>
                <span class="skill-tag">Serverless</span>
            </div>
        </div>
        <div class="skill-card glass-panel">
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="fas fa-brain"></i>
                </div>
                <div>
                    <div class="skill-name">AI/ML Engineering</div>
                    <div class="skill-level">Intermediate</div>
                </div>
            </div>
            <div class="skill-items">
                <span class="skill-tag">TensorFlow</span>
                <span class="skill-tag">PyTorch</span>
                <span class="skill-tag">Computer Vision</span>
                <span class="skill-tag">NLP</span>
                <span class="skill-tag">Neural Networks</span>
                <span class="skill-tag">OpenCV</span>
            </div>
        </div>
    </div>
</section>

<!-- Projects Section -->
<section id="projects">
    <div class="section-header">
        <div class="section-tag">
            <i class="fas fa-folder-open"></i>
            <span>Portfolio</span>
        </div>
        <h2 class="section-title">FEATURED PROJECTS</h2>
        <p class="section-subtitle">Real-world solutions deployed at scale</p>
    </div>
    <div class="projects-grid">
        {% assign projects = site.projects | sort: 'order' %}
        {% for project in projects limit:6 %}
        <div class="project-card glass-panel" data-repo="{{ project.github_repo }}" data-architecture="{{ project.architecture | escape }}">
            <div class="project-image">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,102,255,0.2)); display: flex; align-items: center; justify-content: center; font-size: 4rem;">{{ project.icon }}</div>
                <div class="project-overlay">
                    <button class="btn btn-primary btn-icon" onclick="event.stopPropagation(); viewProject('{{ project.title | escape }}', '{{ project.description | escape }}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    {% if project.github_repo %}
                    <a href="https://github.com/{{ project.github_repo }}" target="_blank" class="btn btn-secondary btn-icon" onclick="event.stopPropagation();">
                        <i class="fab fa-github"></i>
                    </a>
                    {% endif %}
                </div>
            </div>
            <div class="project-content">
                <span class="project-category">{{ project.status }}</span>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description | truncatewords: 20 }}</p>
                <div class="project-tags">
                    {% for tag in project.tags limit:4 %}
                    <span class="project-tag">{{ tag }}</span>
                    {% endfor %}
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</section>

<!-- Experience Section -->
<section id="experience">
    <div class="section-header">
        <div class="section-tag">
            <i class="fas fa-briefcase"></i>
            <span>Career</span>
        </div>
        <h2 class="section-title">PROFESSIONAL JOURNEY</h2>
        <p class="section-subtitle">Building impact through technology and leadership</p>
    </div>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-content glass-panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">2024 - PRESENT</span>
                    <i class="fas fa-code" style="font-size: 1.5rem; color: var(--accent-cyan);"></i>
                </div>
                <h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 0.5rem;">Backend Developer</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">SFB</p>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                    Developing high-scale backend services and system architectures for enterprise applications.
                </p>
            </div>
            <div class="timeline-dot"></div>
        </div>
        <div class="timeline-item">
            <div class="timeline-content glass-panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">2023 - PRESENT</span>
                    <i class="fas fa-users" style="font-size: 1.5rem; color: var(--accent-cyan);"></i>
                </div>
                <h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 0.5rem;">Founder</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Inayat NGO</p>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                    Leading social impact initiatives and community-driven technology solutions.
                </p>
            </div>
            <div class="timeline-dot"></div>
        </div>
        <div class="timeline-item">
            <div class="timeline-content glass-panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">2022 - 2024</span>
                    <i class="fas fa-chart-line" style="font-size: 1.5rem; color: var(--accent-cyan);"></i>
                </div>
                <h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 0.5rem;">Digital Marketing & Tech Expert</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">AUZBIZ</p>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                    Architected digital strategies and technology integrations for enterprise clients.
                </p>
            </div>
            <div class="timeline-dot"></div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact">
    <div class="section-header">
        <div class="section-tag">
            <i class="fas fa-paper-plane"></i>
            <span>Connect</span>
        </div>
        <h2 class="section-title">GET IN TOUCH</h2>
        <p class="section-subtitle">Let's build something extraordinary together</p>
    </div>
    <div class="contact-grid">
        <div class="contact-info glass-panel">
            <h3 style="font-family: var(--font-display); margin-bottom: 1.5rem; color: var(--accent-cyan);">Contact Information</h3>
            <div class="contact-item">
                <div class="contact-item-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Email</div>
                    <a href="mailto:{{ site.email }}" style="font-weight: 600;">{{ site.email }}</a>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-item-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Location</div>
                    <div style="font-weight: 600;">Lahore, PK | Keele, UK</div>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-item-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Phone</div>
                    <div style="font-weight: 600;">+92 316 4119937</div>
                </div>
            </div>
            <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(0, 240, 255, 0.05); border-radius: 12px; border: 1px solid var(--glass-border);">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 50px; height: 50px; background: var(--accent-gradient); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🌍</div>
                    <div>
                        <div style="font-weight: 700; color: var(--accent-cyan);">Open to Opportunities</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted);">Available for freelance & full-time roles</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-form glass-panel">
            <h3 style="font-family: var(--font-display); margin-bottom: 1.5rem; color: var(--accent-cyan);">Send Message</h3>
            <form id="contactForm">
                <div class="form-group">
                    <label for="contactName">Your Name</label>
                    <input type="text" id="contactName" name="name" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label for="contactEmail">Email Address</label>
                    <input type="email" id="contactEmail" name="email" placeholder="john@example.com" required>
                </div>
                <div class="form-group">
                    <label for="contactMessage">Message</label>
                    <textarea id="contactMessage" name="message" placeholder="Tell me about your project..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-paper-plane"></i>
                    <span>Send Message</span>
                </button>
            </form>
        </div>
    </div>
</section>

<!-- Project Modal -->
<div id="projectModal" class="glass-panel" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 900px; max-height: 90vh; overflow-y: auto; z-index: 10000; padding: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--glass-border);">
        <h2 id="modalTitle" style="font-family: var(--font-display); color: var(--accent-cyan);"></h2>
        <div style="display: flex; gap: 0.5rem;">
            <button class="chatbot-btn" id="modalMinimize" title="Minimize">
                <i class="fas fa-minus"></i>
            </button>
            <button class="chatbot-btn" id="modalClose" title="Close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
    <div id="modalContent"></div>
</div>
<div id="modalOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999;"></div>

<script>
function viewProject(title, description) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = '<p style="color: var(--text-secondary); line-height: 1.8;">' + description + '</p>';
    document.getElementById('projectModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('projectModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
});

document.getElementById('modalMinimize').addEventListener('click', function() {
    document.getElementById('projectModal').classList.toggle('minimized');
});

document.getElementById('modalOverlay').addEventListener('click', function() {
    document.getElementById('projectModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
});
</script>
