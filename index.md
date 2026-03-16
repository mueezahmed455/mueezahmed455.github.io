---
layout: default
title: Home
---

<!-- Hero Section -->
<section class="hero-manga">
    <div class="hero-content">
        <h1 class="hero-title">{{ site.title | upcase }}</h1>
        <h2 class="hero-title-japanese">アーメド・ムイーズ</h2>
        <div class="speech-bubble">
            <p>フルスタック開発者 • Full-Stack Engineer<br>
            クラウドアーキテクト • Cloud Architect<br>
            AI システム設計者 • AI Systems Designer</p>
        </div>
    </div>
</section>

<!-- Stats -->
<div class="manga-panel">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <div class="stats-row">
        <div class="stat-box">
            <div class="stat-number">3.8</div>
            <div class="stat-label">GPA • 成績</div>
        </div>
        <div class="stat-box">
            <div class="stat-number">20+</div>
            <div class="stat-label">PROJECTS • 案件</div>
        </div>
        <div class="stat-box">
            <div class="stat-number">5+</div>
            <div class="stat-label">AWARDS • 受賞</div>
        </div>
        <div class="stat-box">
            <div class="stat-number">2028</div>
            <div class="stat-label">GRAD YEAR • 卒業</div>
        </div>
    </div>
</div>

<!-- Skills Section -->
<div class="manga-panel" id="skills">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">技術スキル • SKILLS</h2>
    <div class="skills-grid">
        <div class="skill-box">
            <div class="skill-title">Frontend 前端</div>
            <div class="skill-progress"><div class="progress-bar" style="width: 90%;"></div></div>
            <ul class="skill-list">
                <li>React.js & Next.js</li>
                <li>TypeScript</li>
                <li>HTML5/CSS3/Tailwind</li>
                <li>Three.js & WebGL</li>
            </ul>
        </div>
        <div class="skill-box">
            <div class="skill-title">Backend 後端</div>
            <div class="skill-progress"><div class="progress-bar" style="width: 85%;"></div></div>
            <ul class="skill-list">
                <li>Node.js & Express</li>
                <li>Python & FastAPI</li>
                <li>C++ Programming</li>
                <li>REST & GraphQL</li>
            </ul>
        </div>
        <div class="skill-box">
            <div class="skill-title">Database 数据庫</div>
            <div class="skill-progress"><div class="progress-bar" style="width: 80%;"></div></div>
            <ul class="skill-list">
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>DynamoDB</li>
                <li>Schema Design</li>
            </ul>
        </div>
        <div class="skill-box">
            <div class="skill-title">Cloud クラウド</div>
            <div class="skill-progress"><div class="progress-bar" style="width: 75%;"></div></div>
            <ul class="skill-list">
                <li>AWS (EC2, S3, Lambda)</li>
                <li>Azure Services</li>
                <li>Docker & Kubernetes</li>
                <li>CI/CD Pipelines</li>
            </ul>
        </div>
        <div class="skill-box">
            <div class="skill-title">Security 安全</div>
            <div class="skill-progress"><div class="progress-bar" style="width: 70%;"></div></div>
            <ul class="skill-list">
                <li>JWT Authentication</li>
                <li>OAuth 2.0</li>
                <li>bcrypt Encryption</li>
                <li>RBAC Systems</li>
            </ul>
        </div>
        <div class="skill-box">
            <div class="skill-title">AI/ML 機械学習</div>
            <div class="skill-progress"><div class="progress-bar" style="width: 80%;"></div></div>
            <ul class="skill-list">
                <li>TensorFlow</li>
                <li>Neural Networks</li>
                <li>Computer Vision</li>
                <li>System Design</li>
            </ul>
        </div>
    </div>
</div>

<!-- Projects Preview Section -->
<div class="manga-panel">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">プロジェクト • PROJECTS</h2>
    <div class="projects-grid">
        {% assign projects = site.projects | sort: 'order' %}
        {% for project in projects limit:4 %}
        <div class="project-card">
            <div class="project-header">
                <div class="project-icon">{{ project.icon }}</div>
                <h3 class="project-title">{{ project.title }}</h3>
                <div class="project-meta">{{ project.date_range }} • {{ project.status }}</div>
            </div>
            <div class="project-body">
                <p>{{ project.description }}</p>
                <div class="tech-tags">
                    {% for tag in project.tags %}
                    <span class="tech-tag">{{ tag }}</span>
                    {% endfor %}
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
    <div style="text-align: center; margin-top: 3rem;">
        <a href="{{ site.baseurl }}/projects/" class="chat-toggle" style="text-decoration: none; display: inline-block;">View All Projects • すべて表示</a>
    </div>
</div>

<!-- Experience Timeline -->
<div class="manga-panel">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">経験 • EXPERIENCE</h2>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">2024 - PRESENT</div>
                <h3 class="timeline-title">Full-Stack Developer</h3>
                <p style="color: var(--accent); margin-bottom: 0.5rem;">Freelance • Upwork</p>
                <p>Developed 10+ production apps for international clients. Secure authentication, payment integrations, 5-star ratings.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>

        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">SUMMER 2024</div>
                <h3 class="timeline-title">Software Engineering Intern</h3>
                <p style="color: var(--accent); margin-bottom: 0.5rem;">Netsol Technologies</p>
                <p>Enterprise automotive finance software. .NET, SQL Server, Angular. Optimized queries by 35%.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>

        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">2023 - 2024</div>
                <h3 class="timeline-title">Open Source Contributor</h3>
                <p style="color: var(--accent); margin-bottom: 0.5rem;">Various Projects • GitHub</p>
                <p>TensorFlow, IoT frameworks, web libraries. 20+ successful pull requests and merges.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>

        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">2022 - 2023</div>
                <h3 class="timeline-title">Robotics Team Lead</h3>
                <p style="color: var(--accent); margin-bottom: 0.5rem;">NUST National Science Bee</p>
                <p>Led team of 5. 1st place in Robowars and Roborace. Implemented ML for obstacle detection.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
    </div>
</div>

<!-- Resume Section -->
<div class="manga-panel" style="text-align: center;">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">経歴書 • RESUME</h2>
    <p style="margin-bottom: 2rem; font-size: 1.2rem;">Download my full resume for a detailed overview of my experience and technical skills.</p>
    <a href="{{ site.baseurl }}/assets/docs/Mueez_Ahmed_Resume.pdf" class="chat-toggle" style="text-decoration: none; display: inline-block;" download>
        DOWNLOAD CV • 履歴書をダウンロード
    </a>
</div>

<!-- Contact Section -->
<div class="manga-panel">
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    
    <h2 class="section-title">連絡 • CONTACT</h2>
    <div class="contact-grid">
        <div class="contact-info">
            <div class="contact-item">
                <div class="contact-icon">📧</div>
                <div>
                    <strong>Email</strong><br>
                    <a href="mailto:{{ site.email }}" style="color: var(--text-primary); text-decoration: none;">{{ site.email }}</a>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-icon">📱</div>
                <div>
                    <strong>Phone</strong><br>
                    +92 316 4119937
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                    <strong>Location</strong><br>
                    Lahore, Pakistan
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-icon">💼</div>
                <div>
                    <strong>LinkedIn</strong><br>
                    <a href="https://linkedin.com/in/mueezahmed" style="color: var(--text-primary); text-decoration: none;">linkedin.com/in/mueezahmed</a>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-icon">💻</div>
                <div>
                    <strong>GitHub</strong><br>
                    <a href="https://github.com/{{ site.github_username }}" style="color: var(--text-primary); text-decoration: none;">github.com/{{ site.github_username }}</a>
                </div>
            </div>
        </div>

        <div class="contact-form">
            <form id="contactForm">
                <div class="form-group">
                    <label>NAME • 名前</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>EMAIL • メール</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>SUBJECT • 件名</label>
                    <input type="text" name="subject" required>
                </div>
                <div class="form-group">
                    <label>MESSAGE • メッセージ</label>
                    <textarea name="message" required></textarea>
                </div>
                <button type="submit" class="submit-btn">送信 • SEND MESSAGE</button>
            </form>
        </div>
    </div>
</div>
