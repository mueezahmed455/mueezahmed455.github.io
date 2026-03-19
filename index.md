---
layout: default
title: Home
---

<section class="hero-manga">
    <div class="hero-content">
        <h1 class="hero-title">MUEEZ AHMED</h1>
        <div class="speech-bubble">
            <p>
                <span class="en-text">Full-Stack Engineer • Cloud Architect • AI Systems Designer</span>
            </p>
        </div>
    </div>
</section>

<div class="manga-panel">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <div class="stats-row">
        <div class="stat-box" id="stat-gpa">
            <div class="stat-number">3.8</div>
            <div class="stat-label">
                <span class="en-text">GPA • GRADE</span>
            </div>
        </div>
        <div class="stat-box" id="stat-projects">
            <div class="stat-number">20+</div>
            <div class="stat-label">
                <span class="en-text">PROJECTS</span>
            </div>
        </div>
        <div class="stat-box" id="stat-commits">
            <div class="stat-number">--</div>
            <div class="stat-label">
                <span class="en-text">COMMITS</span>
            </div>
        </div>
        <div class="stat-box" id="stat-grad">
            <div class="stat-number">2028</div>
            <div class="stat-label">
                <span class="en-text">GRAD YEAR</span>
            </div>
        </div>
    </div>

    <div style="margin-top: 3rem;">
        <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1.5rem; text-align: center;">
            <span class="en-text">EDUCATION</span>
        </h3>
        <div class="code-terminal" id="terminal">
            <div class="terminal-header">
                <div class="terminal-dot red"></div>
                <div class="terminal-dot yellow"></div>
                <div class="terminal-dot green"></div>
                <span style="margin-left: 10px; font-size: 0.7rem; opacity: 0.5;">neural-sh — 80x24</span>
            </div>
            <div id="terminal-content" style="height: 200px; overflow-y: auto;">
                <div class="terminal-line">
                    <span class="terminal-prompt">$</span> cat education.txt
                </div>
                <div class="terminal-line">
                    <strong style="color: var(--accent);">BSc Computer Science</strong>
                </div>
                <div class="terminal-line">📍 Keele University, United Kingdom</div>
                <div class="terminal-line">📊 GPA: 3.8/4.0 (Dean's List)</div>
                <div class="terminal-line" style="margin-top: 1rem;">
                    <span class="en-text">📚 Full-Stack, Cloud Architecture, AI/ML</span>
                </div>
            </div>
            <div class="terminal-input-row" style="display: flex; align-items: center; margin-top: 10px; border-top: 1px solid rgba(0,255,0,0.1); padding-top: 5px;">
                <span class="terminal-prompt" style="color: var(--accent); margin-right: 10px;">$</span>
                <input type="text" id="terminal-input" style="background: transparent; border: none; color: #00ff00; font-family: 'JetBrains Mono', monospace; outline: none; flex: 1;" placeholder="type 'help'...">
            </div>
        </div>
    </div>

    <div style="margin-top: 2rem;">
        <div class="quick-links">
            <a href="https://github.com/{{ site.github_username }}" target="_blank" class="quick-link-btn">
                <div class="quick-link-icon">💻</div>
                <div style="font-weight: 700;">GitHub</div>
            </a>
            <a href="https://linkedin.com/in/mueezahmed" target="_blank" class="quick-link-btn">
                <div class="quick-link-icon">💼</div>
                <div style="font-weight: 700;">LinkedIn</div>
            </a>
            <a href="mailto:{{ site.email }}" class="quick-link-btn">
                <div class="quick-link-icon">📧</div>
                <div style="font-weight: 700;">Email</div>
            </a>
            <a href="{{ site.baseurl }}/Resume%20new%20(1).pdf" class="quick-link-btn" download>
                <div class="quick-link-icon">📄</div>
                <div style="font-weight: 700;">
                    <span class="en-text">Resume</span>
                </div>
            </a>
        </div>
    </div>
</div>

<div class="manga-panel" id="skills">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">
        <span class="en-text">SKILLS</span>
    </h2>
    <div class="skills-grid">
        <div class="skill-box">
            <div class="skill-title">Frontend</div>
            <ul class="skill-list" style="list-style: none; padding-left: 0;">
                <li>▸ React.js & Next.js</li>
                <li>▸ TypeScript</li>
                <li>▸ Three.js & WebGL</li>
            </ul>
        </div>
        <div class="skill-box">
            <div class="skill-title">Backend</div>
            <ul class="skill-list" style="list-style: none; padding-left: 0;">
                <li>▸ Node.js & Express</li>
                <li>▸ Python & FastAPI</li>
                <li>▸ AWS & Docker</li>
            </ul>
        </div>
        <div class="skill-box">
            <div class="skill-title">AI/ML</div>
            <ul class="skill-list" style="list-style: none; padding-left: 0;">
                <li>▸ TensorFlow</li>
                <li>▸ Neural Networks</li>
                <li>▸ Computer Vision</li>
            </ul>
        </div>
    </div>
</div>

<div class="manga-panel">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">
        <span class="en-text">PROJECTS</span>
    </h2>
    <div class="projects-grid">
        {% assign projects = site.projects | sort: 'order' %}
        {% for project in projects limit:6 %}
        <div class="project-card" data-repo="{{ project.github_repo }}" data-architecture="{{ project.architecture | escape }}">
            <div class="project-header">
                <div class="project-icon">{{ project.icon }}</div>
                <h3 class="project-title">{{ project.title }}</h3>
                <div class="project-meta">{{ project.date_range }}</div>
            </div>
            <div class="project-body">
                <p>
                    <span class="en-text">{{ project.description }}</span>
                </p>
                <div class="tech-tags">
                    {% for tag in project.tags %}
                    <span class="tech-tag">{{ tag }}</span>
                    {% endfor %}
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>

<div class="manga-panel">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">LIVE CODING PULSE</h2>
    <div class="dashboard-grid">
        <div class="live-pulse-card">
            <div class="pulse-header">
                <h4 style="font-family: 'Inter', sans-serif;">ACTIVITY</h4>
                <div class="pulse-dot"></div>
            </div>
            <div style="font-size: 0.9rem; color: var(--text-secondary);">
                Last 7 Days: <span style="color: var(--accent); font-weight: 700;">42.5 hrs</span><br>
                Status: <span style="color: #00ff00;">READY_TO_DEPLOY</span>
            </div>
        </div>
        <div class="live-pulse-card">
            <h4 style="font-family: 'Inter', sans-serif; margin-bottom: 1rem;">TECH STACK</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                    <span>Typescript</span><span>45%</span>
                </div>
                <div style="width: 100%; height: 4px; background: rgba(0,255,0,0.1);">
                    <div style="width: 45%; height: 100%; background: #00ff00;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                    <span>Python</span><span>30%</span>
                </div>
                <div style="width: 100%; height: 4px; background: rgba(0,255,0,0.1);">
                    <div style="width: 30%; height: 100%; background: #00ff00;"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="manga-panel">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">SYSTEM HEALTH (SRE)</h2>
    <div class="dashboard-grid" id="sre-dashboard">
        <div class="live-pulse-card">
            <div class="pulse-header">
                <h4 style="font-family: 'JetBrains Mono', monospace; color: var(--accent);">[ API GATEWAY ]</h4>
                <div class="pulse-dot" id="status-api"></div>
            </div>
            <div style="font-size: 0.85rem; font-family: 'JetBrains Mono', monospace;">
                LATENCY: <span id="latency-api" style="color: #00ff00;">-- ms</span><br>
                UPTIME: <span style="color: #00ff00;">99.99%</span><br>
                LOAD: <span style="color: var(--accent);">OPTIMIZED</span>
            </div>
        </div>
        <div class="live-pulse-card">
            <div class="pulse-header">
                <h4 style="font-family: 'JetBrains Mono', monospace; color: var(--accent);">[ E-COMMERCE ]</h4>
                <div class="pulse-dot" id="status-ecommerce"></div>
            </div>
            <div style="font-size: 0.85rem; font-family: 'JetBrains Mono', monospace;">
                LATENCY: <span id="latency-ecommerce" style="color: #00ff00;">-- ms</span><br>
                UPTIME: <span style="color: #00ff00;">99.98%</span><br>
                STATUS: <span style="color: #00ff00;">STABLE</span>
            </div>
        </div>
        <div class="live-pulse-card">
            <h4 style="font-family: 'JetBrains Mono', monospace; margin-bottom: 1rem; color: var(--accent);">[ SRE LOGS ]</h4>
            <div id="sre-logs" style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; height: 60px; overflow-y: hidden;">
                > Booting health monitors...<br>
                > All systems nominal.
            </div>
        </div>
    </div>
</div>

<div class="manga-panel">
    <div class="panel-corner top-left"></div><div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div><div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">SECURITY & DISTRIBUTED LAB</h2>
    <div class="dashboard-grid">
        <div class="live-pulse-card">
            <h4 style="font-family: 'JetBrains Mono', monospace; margin-bottom: 1rem; color: var(--accent);">[ BLOCKCHAIN SIM ]</h4>
            <div id="blockchain-list" style="height: 100px; overflow-y: auto; margin-bottom: 1rem; border: 1px solid rgba(0,255,0,0.2); padding: 5px;">
                <div class="terminal-line" style="font-size: 0.7rem;">GENESIS_BLOCK [HASH: 000...]</div>
            </div>
            <button id="mine-block" class="submit-btn" style="width: auto; padding: 0.5rem 1rem; font-size: 0.8rem;">MINE NEW BLOCK</button>
        </div>
        <div class="live-pulse-card">
            <h4 style="font-family: 'JetBrains Mono', monospace; margin-bottom: 1rem; color: var(--accent);">[ JWT DEBUGGER ]</h4>
            <input type="text" id="jwt-input" placeholder="Paste JWT here..." style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); color: #00ff00; font-family: 'JetBrains Mono', monospace; padding: 5px; font-size: 0.7rem; margin-bottom: 10px;">
            <div id="jwt-output" style="font-size: 0.65rem; font-family: 'JetBrains Mono', monospace; color: #aaa;">
                Awaiting valid JWT structure...
            </div>
        </div>
    </div>
</div>

<div class="manga-panel">
    <div class="panel-corner top-left"></div><div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div><div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">WASM CODE PLAYGROUND</h2>
    <div class="code-terminal">
        <div class="terminal-header">
            <span style="color: var(--accent); font-family: 'JetBrains Mono', monospace;">[ python_runtime.wasm ]</span>
        </div>
        <textarea id="python-code" style="width: 100%; height: 100px; background: transparent; border: none; color: #00ff00; font-family: 'JetBrains Mono', monospace; outline: none; resize: none;">print("Hello from Mueez's Wasm Runtime!")
# Try running some logic here</textarea>
        <button id="run-python" class="submit-btn" style="margin-top: 1rem; width: auto; padding: 0.5rem 2rem;">RUN CODE</button>
        <div id="wasm-output" style="margin-top: 1rem; border-top: 1px solid var(--border); padding-top: 0.5rem; font-size: 0.8rem; color: #00ff00;">> Output will appear here...</div>
    </div>
</div>

<div class="manga-panel">
    <div class="panel-corner top-left"></div><div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div><div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">
        <span class="en-text">EXPERIENCE</span>
    </h2>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-content">
                <div style="font-weight: 700; color: var(--accent);">2024 - PRESENT</div>
                <h3>Backend Developer @ SFB</h3>
                <p>Developing high-scale backend services and system architectures.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
        <div class="timeline-item">
            <div class="timeline-content">
                <div style="font-weight: 700; color: var(--accent);">2023 - PRESENT</div>
                <h3>Founder @ Inayat NGO</h3>
                <p>Leading social impact initiatives and community-driven technology solutions.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
        <div class="timeline-item">
            <div class="timeline-content">
                <div style="font-weight: 700; color: var(--accent);">2022 - 2024</div>
                <h3>Digital Marketing & Tech Expert @ AUZBIZ</h3>
                <p>Architected digital strategies and technology integrations for enterprise clients.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
    </div>
</div>

<div class="manga-panel">
    <div class="panel-corner top-left"></div><div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div><div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">
        <span class="en-text">CONTACT</span>
    </h2>
    <div class="contact-grid">
        <div class="contact-info">
            <div id="globe-container" style="width: 100%; height: 250px; margin-bottom: 1rem;"></div>
            <div style="margin-bottom: 1rem;">
                <strong>📍 Locations:</strong> Lahore, PK | Keele, UK
            </div>
            <div style="margin-bottom: 1rem;">
                <strong>📧 Email:</strong> <a href="mailto:mueezahmad69@gmail.com" style="color: var(--accent);">mueezahmad69@gmail.com</a>
            </div>
            <div style="margin-bottom: 1rem;">
                <strong>📱 Phone:</strong> +92 316 4119937
            </div>
        </div>

        <div class="contact-form">
            <h4 style="font-family: 'JetBrains Mono', monospace; margin-bottom: 1rem;">[ REAL-TIME GUESTBOOK ]</h4>
            <div id="guestbook-wall" style="height: 150px; overflow-y: auto; border: 2px solid var(--border); padding: 0.5rem; margin-bottom: 1rem; font-size: 0.85rem;">
                <div style="margin-bottom: 0.5rem;"><strong>System:</strong> Welcome to the wall!</div>
            </div>
            <form id="contactForm">
                <input type="text" name="name" placeholder="YOUR NAME" required style="margin-bottom: 0.5rem;">
                <textarea name="message" placeholder="MESSAGE THE WALL" required></textarea>
                <button type="submit" class="submit-btn">POST MESSAGE</button>
            </form>
        </div>
    </div>
</div>
