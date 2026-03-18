---
layout: default
title: Home
---

<section class="hero-manga">
    <div class="hero-content">
        <h1 class="hero-title">MUEEZ AHMED</h1>
        <h2 class="hero-title-japanese">アーメド・ムイーズ</h2>
        <div class="speech-bubble">
            <p>
                <span class="jp-text">フルスタック開発者 • Full-Stack Engineer<br>
                クラウドアーキテクト • Cloud Architect<br>
                AI システム設計者 • AI Systems Designer</span>
                <span class="en-text">Full-Stack Engineer • フルスタック開発者<br>
                Cloud Architect • クラウドアーキテクト<br>
                AI Systems Designer • AI システム設計者</span>
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
                <span class="jp-text">GPA • 成績</span>
                <span class="en-text">GPA • GRADE</span>
            </div>
        </div>
        <div class="stat-box" id="stat-projects">
            <div class="stat-number">20+</div>
            <div class="stat-label">
                <span class="jp-text">プロジェクト</span>
                <span class="en-text">PROJECTS</span>
            </div>
        </div>
        <div class="stat-box" id="stat-commits">
            <div class="stat-number">--</div>
            <div class="stat-label">
                <span class="jp-text">コミット数</span>
                <span class="en-text">COMMITS</span>
            </div>
        </div>
        <div class="stat-box" id="stat-grad">
            <div class="stat-number">2028</div>
            <div class="stat-label">
                <span class="jp-text">卒業年</span>
                <span class="en-text">GRAD YEAR</span>
            </div>
        </div>
    </div>

    <div style="margin-top: 3rem;">
        <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1.5rem; text-align: center;">
            <span class="jp-text">教育 • EDUCATION</span>
            <span class="en-text">EDUCATION • 教育</span>
        </h3>
        <div class="code-terminal" id="terminal">
            <div class="terminal-header">
                <div class="terminal-dot red"></div>
                <div class="terminal-dot yellow"></div>
                <div class="terminal-dot green"></div>
            </div>
            <div id="terminal-content">
                <div class="terminal-line">
                    <span class="terminal-prompt">$</span> cat education.txt
                </div>
                <div class="terminal-line">
                    <strong style="color: var(--accent);">BSc Computer Science</strong>
                </div>
                <div class="terminal-line">📍 Keele University, United Kingdom</div>
                <div class="terminal-line">📊 GPA: 3.8/4.0 (Dean's List)</div>
                <div class="terminal-line" style="margin-top: 1rem;">
                    <span class="jp-text">📚 フルスタック開発、クラウドアーキテクチャ、AI/ML</span>
                    <span class="en-text">📚 Full-Stack, Cloud Architecture, AI/ML</span>
                </div>
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
                    <span class="jp-text">履歴書</span>
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
        <span class="jp-text">技術スキル • SKILLS</span>
        <span class="en-text">SKILLS • 技術スキル</span>
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
        <span class="jp-text">プロジェクト • PROJECTS</span>
        <span class="en-text">PROJECTS • プロジェクト</span>
    </h2>
    <div class="projects-grid">
        {% assign projects = site.projects | sort: 'order' %}
        {% for project in projects limit:6 %}
        <div class="project-card">
            <div class="project-header">
                <div class="project-icon">{{ project.icon }}</div>
                <h3 class="project-title">{{ project.title }}</h3>
                <div class="project-meta">{{ project.date_range }}</div>
            </div>
            <div class="project-body">
                <p>
                    <span class="jp-text">{{ project.description_jp | default: project.description }}</span>
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
    
    <h2 class="section-title">
        <span class="jp-text">連絡 • CONTACT</span>
        <span class="en-text">CONTACT • 連絡</span>
    </h2>
    <div class="contact-grid">
        <div class="contact-info">
            <div style="margin-bottom: 1.5rem;">
                <strong>Email:</strong><br>
                <a href="mailto:{{ site.email }}" style="color: var(--text-primary); text-decoration: none;">{{ site.email }}</a>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <strong>Location:</strong><br>
                Keele University, UK
            </div>
        </div>

        <div class="contact-form">
            <form id="contactForm">
                <div class="form-group">
                    <label>NAME</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>EMAIL</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>MESSAGE</label>
                    <textarea name="message" required></textarea>
                </div>
                <button type="submit" class="submit-btn">SEND</button>
            </form>
        </div>
    </div>
</div>
