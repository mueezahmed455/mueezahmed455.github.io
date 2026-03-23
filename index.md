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
        <p class="section-subtitle">Technologies and tools I use to bring ideas to life</p>
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
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">HTML5/CSS3</span>
                <span class="skill-tag">Tailwind CSS</span>
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
                <span class="skill-tag">Express</span>
                <span class="skill-tag">FastAPI</span>
                <span class="skill-tag">PostgreSQL</span>
                <span class="skill-tag">MongoDB</span>
            </div>
        </div>
        <div class="skill-card glass-panel">
            <div class="skill-header">
                <div class="skill-icon"><i class="fas fa-cloud"></i></div>
                <div class="skill-name">Cloud & DevOps</div>
            </div>
            <div class="skill-items">
                <span class="skill-tag">AWS</span>
                <span class="skill-tag">Azure</span>
                <span class="skill-tag">Docker</span>
                <span class="skill-tag">Kubernetes</span>
                <span class="skill-tag">CI/CD</span>
                <span class="skill-tag">GitHub Actions</span>
            </div>
        </div>
        <div class="skill-card glass-panel">
            <div class="skill-header">
                <div class="skill-icon"><i class="fas fa-brain"></i></div>
                <div class="skill-name">AI/ML</div>
            </div>
            <div class="skill-items">
                <span class="skill-tag">TensorFlow</span>
                <span class="skill-tag">PyTorch</span>
                <span class="skill-tag">Computer Vision</span>
                <span class="skill-tag">NLP</span>
                <span class="skill-tag">Neural Networks</span>
            </div>
        </div>
    </div>
</section>

<!-- Projects Section -->
<section id="projects" class="reveal">
    <div class="section-header">
        <h2 class="section-title">FEATURED PROJECTS</h2>
        <p class="section-subtitle">A selection of my recent work and contributions</p>
    </div>
    <div class="projects-grid">
        {% assign projects = site.projects | sort: 'order' %}
        {% for project in projects limit:6 %}
        <div class="project-card glass-panel" data-title="{{ project.title | escape }}" data-description="{{ project.description | escape }}">
            <div class="project-content">
                <div style="font-size: 3rem; margin-bottom: 1rem;">{{ project.icon }}</div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p>{{ project.description | truncate: 120 }}</p>
                <div class="project-buttons">
                    <button class="btn btn-primary btn-sm view-project-btn">View Details</button>
                    {% if project.github_repo %}
                    <a href="https://github.com/{{ project.github_repo }}" target="_blank" class="btn btn-secondary btn-sm">
                        <i class="fab fa-github"></i>
                    </a>
                    {% endif %}
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</section>

<!-- Experience Section -->
<section id="experience" class="reveal">
    <div class="section-header">
        <h2 class="section-title">EXPERIENCE</h2>
        <p class="section-subtitle">My professional journey and contributions</p>
    </div>
    <div class="timeline" style="position: relative; max-width: 900px; margin: 0 auto;">
        <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--accent-gradient); border-radius: 3px;"></div>
        
        <div style="position: relative; padding-left: 2rem; margin-bottom: 2.5rem;">
            <div style="position: absolute; left: -8px; top: 0; width: 19px; height: 19px; background: var(--bg-space); border: 3px solid var(--accent-cyan); border-radius: 50%; box-shadow: var(--accent-glow);"></div>
            <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px;">
                <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; background: var(--accent-gradient); color: var(--bg-space); border-radius: 50px; font-size: 0.85rem; font-weight: 600; font-family: var(--font-mono); margin-bottom: 1rem;">
                    <i class="fas fa-calendar"></i> 2024 - Present
                </div>
                <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Full-Stack Developer</h3>
                <p style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Freelance • Upwork</p>
                <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">Developed 10+ production applications for international clients. Implemented secure authentication, payment integrations, and achieved 5-star ratings.</p>
            </div>
        </div>
        
        <div style="position: relative; padding-left: 2rem; margin-bottom: 2.5rem;">
            <div style="position: absolute; left: -8px; top: 0; width: 19px; height: 19px; background: var(--bg-space); border: 3px solid var(--accent-cyan); border-radius: 50%; box-shadow: var(--accent-glow);"></div>
            <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px;">
                <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; background: var(--accent-gradient); color: var(--bg-space); border-radius: 50px; font-size: 0.85rem; font-weight: 600; font-family: var(--font-mono); margin-bottom: 1rem;">
                    <i class="fas fa-calendar"></i> Summer 2024
                </div>
                <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Software Engineering Intern</h3>
                <p style="color: var(--accent-cyan); margin-bottom: 0.5rem;">NetSol Technologies</p>
                <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">Worked on enterprise automotive finance software using .NET, SQL Server, and Angular. Optimized database queries by 35%.</p>
            </div>
        </div>
        
        <div style="position: relative; padding-left: 2rem; margin-bottom: 2.5rem;">
            <div style="position: absolute; left: -8px; top: 0; width: 19px; height: 19px; background: var(--bg-space); border: 3px solid var(--accent-cyan); border-radius: 50%; box-shadow: var(--accent-glow);"></div>
            <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px;">
                <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; background: var(--accent-gradient); color: var(--bg-space); border-radius: 50px; font-size: 0.85rem; font-weight: 600; font-family: var(--font-mono); margin-bottom: 1rem;">
                    <i class="fas fa-calendar"></i> 2023 - 2024
                </div>
                <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Open Source Contributor</h3>
                <p style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Various Projects • GitHub</p>
                <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">Contributed to TensorFlow, IoT frameworks, and web libraries. Successfully merged 20+ pull requests.</p>
            </div>
        </div>
    </div>
</section>

<!-- Awards Section -->
<section id="awards" class="reveal">
    <div class="section-header">
        <h2 class="section-title">AWARDS & RECOGNITION</h2>
        <p class="section-subtitle">Achievements and accolades from competitions and academics</p>
    </div>
    <div class="skills-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px; display: flex; align-items: flex-start; gap: 1rem;">
            <div style="width: 60px; height: 60px; min-width: 60px; background: var(--accent-gradient); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--accent-glow);">🏆</div>
            <div>
                <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Teknofest Turkey - Best Category</h4>
                <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 0.5rem;">International competition winner</p>
                <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">2019</span>
            </div>
        </div>
        
        <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px; display: flex; align-items: flex-start; gap: 1rem;">
            <div style="width: 60px; height: 60px; min-width: 60px; background: var(--accent-gradient); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--accent-glow);">🥇</div>
            <div>
                <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Intel ISEF - National Winner</h4>
                <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 0.5rem;">International Science and Engineering Fair</p>
                <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">2020</span>
            </div>
        </div>
        
        <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px; display: flex; align-items: flex-start; gap: 1rem;">
            <div style="width: 60px; height: 60px; min-width: 60px; background: var(--accent-gradient); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--accent-glow);">🤖</div>
            <div>
                <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">NUST Science Bee - 1st Place</h4>
                <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 0.5rem;">Robowars & Roborace Champion</p>
                <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">2023</span>
            </div>
        </div>
        
        <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px; display: flex; align-items: flex-start; gap: 1rem;">
            <div style="width: 60px; height: 60px; min-width: 60px; background: var(--accent-gradient); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--accent-glow);">📚</div>
            <div>
                <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Dean's List</h4>
                <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 0.5rem;">Top 10% Academic Performance</p>
                <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">2024-Present</span>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="reveal">
    <div class="section-header">
        <h2 class="section-title">GET IN TOUCH</h2>
        <p class="section-subtitle">Have a project in mind? Let's build something amazing together</p>
    </div>
    <div class="contact-form glass-panel" style="max-width: 600px; margin: 0 auto; padding: 2.5rem;">
        <form id="contactForm">
            <div class="form-group">
                <input type="text" id="contactName" placeholder="Your Name" required>
            </div>
            <div class="form-group">
                <input type="email" id="contactEmail" placeholder="Your Email" required>
            </div>
            <div class="form-group">
                <textarea id="contactMessage" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
                <i class="fas fa-paper-plane"></i>
                Send Message
            </button>
        </form>
        
        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--glass-border); text-align: center;">
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 1rem;">Or reach out directly:</p>
            <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
                <a href="mailto:mueezahmad69@gmail.com" style="display: flex; align-items: center; gap: 0.5rem; color: var(--accent-cyan);">
                    <i class="fas fa-envelope"></i> mueezahmad69@gmail.com
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Project Modal -->
<div id="projectModal" class="glass-panel" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 600px; z-index: 10000; padding: 2rem; border-radius: 20px;">
    <h2 id="modalTitle" style="margin-bottom: 1rem; color: var(--accent-cyan);"></h2>
    <p id="modalDescription" style="line-height: 1.6; color: rgba(255,255,255,0.8);"></p>
    <button class="btn btn-secondary" id="modalClose" style="margin-top: 1.5rem;">Close</button>
</div>
<div id="modalOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999;"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {
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
    
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
});
</script>
