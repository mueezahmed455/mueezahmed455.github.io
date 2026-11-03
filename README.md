# Mueez Ahmed — Engineering Portfolio

A static, Jekyll-powered portfolio published through GitHub Pages.

## Design direction

A dark, technical editorial system with restrained motion, project-specific diagrams and practical interactive tools. The site is deliberately not built around stock imagery, fabricated metrics, fake visitor telemetry or AI-labelled interactions without an AI service.

## Project coverage

- Cognify OS — AI agent and MCP tool governance; private source repository, deployed web app.
- X.Group — workflow and automation infrastructure product.
- PhishSwipe — local-first phishing-awareness browser prototype.
- AUZBIZ — Next.js travel-services application codebase.
- SPECTRA-GNN — academic research manuscript in progress.
- PyFlow / AI Automata — product exploration; not presented as shipped software.
- KebabLab — restaurant-commerce product exploration; not presented as a delivered client platform.

## Interactive features

- Responsive navigation, dark/light themes and scroll progress.
- Keyboard command deck (Ctrl/Cmd + K, or / outside input fields).
- Local portfolio guide with authored answers; no model API.
- Canvas network field that pauses when off-screen and respects reduced motion.
- Cognify architecture explorer.
- Client-side JWT structure inspector. It decodes header and payload only and does not verify signatures.
- Local command console for navigating project information.
- Contact links and clipboard copy.
- All interactive tools run in the browser; pasted JWT text is not sent to a server.

## Local development

Requires Ruby and Bundler.

    bundle install
    bundle exec jekyll serve

Open http://127.0.0.1:4000.

## Deployment

The repository name is mueezahmed455.github.io. GitHub Pages publishes the root of the main branch. The site uses standard Jekyll and does not need a Node build pipeline.

## Content integrity

The portfolio distinguishes product status, repository visibility, deployment state and research maturity. Performance figures and claims should be included only when they have reproducible evidence. Concept work is marked as concept work.
