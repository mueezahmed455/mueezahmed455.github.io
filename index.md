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
            <button class="btn btn-primary scroll-link" data-target="projects">
                <i class="fas fa-rocket"></i>
                <span>View Projects</span>
            </button>
            <button class="btn btn-secondary scroll-link" data-target="contact">
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
<section id="skills" class="reveal">
    <div class="section-header">
        <h2 class="section-title">TECHNICAL ARSENAL</h2>
    </div>
    <div class="skills-grid">
        <div class="skill-card glass-panel">
            <div class="skill-header">
                <div class="skill-icon"><i class="fas fa-code"></i></div>
                <div class="skill-name">Frontend</div>
            </div>
            <div class="skill-items">
                <span class="skill-tag">React.js</span>
                <span class="skill-tag">Next.js</span>
                <span class="skill-tag">TypeScript</span>
            </div>
        </div>
        <div class="skill-card glass-panel">
            <div class="skill-header">
                <div class="skill-icon"><i class="fas fa-server"></i></div>
                <div class="skill-name">Backend</div>
            </div>
            <div class="skill-items">
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">PostgreSQL</span>
            </div>
        </div>
    </div>
</section>

<!-- Projects Section -->
<section id="projects" class="reveal">
    <div class="section-header">
        <h2 class="section-title">FEATURED PROJECTS</h2>
    </div>
    <div class="projects-grid">
        {% assign projects = site.projects | sort: 'order' %}
        {% for project in projects limit:6 %}
        <div class="project-card glass-panel" data-title="{{ project.title | escape }}" data-description="{{ project.description | escape }}">
            <div class="project-content">
                <div style="font-size: 3rem; margin-bottom: 1rem;">{{ project.icon }}</div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p>{{ project.description | truncate: 100 }}</p>
                <div class="project-buttons" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <button class="btn btn-primary btn-sm view-project-btn">View</button>
                    {% if project.github_repo %}
                    <a href="https://github.com/{{ project.github_repo }}" target="_blank" class="btn btn-secondary btn-sm">GitHub</a>
                    {% endif %}
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="reveal">
    <div class="section-header">
        <h2 class="section-title">GET IN TOUCH</h2>
    </div>
    <div class="contact-form glass-panel" style="max-width: 600px; margin: 0 auto; padding: 2rem;">
        <form id="contactForm">
            <div class="form-group" style="margin-bottom: 1rem;">
                <input type="text" id="contactName" placeholder="Name" required style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: #fff;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <input type="email" id="contactEmail" placeholder="Email" required style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: #fff;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <textarea id="contactMessage" placeholder="Message" required style="width: 100%; padding: 0.8rem; height: 150px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: #fff;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Send System Signal</button>
        </form>
    </div>
</section>

<!-- Project Modal -->
<div id="projectModal" class="glass-panel" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 600px; z-index: 10000; padding: 2rem;">
    <h2 id="modalTitle" style="margin-bottom: 1rem; color: var(--accent-cyan);"></h2>
    <p id="modalDescription" style="line-height: 1.6;"></p>
    <button class="btn btn-secondary" id="modalClose" style="margin-top: 1.5rem;">Close</button>
</div>
<div id="modalOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999;"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    // Scroll logic
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Modal logic
    const modal = document.getElementById('projectModal');
    const overlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            modalTitle.textContent = card.getAttribute('data-title');
            modalDesc.textContent = card.getAttribute('data-description');
            modal.style.display = 'block';
            overlay.style.display = 'block';
        });
    });

    document.getElementById('modalClose').addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
});
</script>
