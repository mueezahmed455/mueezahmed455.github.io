# Mueez Ahmed — Engineering Portfolio

A custom, static portfolio published with GitHub Pages and Jekyll.

## Direction

The site is an engineering portfolio rather than a generic résumé template. It documents a small set of projects with explicit scope, architecture, current status and evidence links. It avoids unsupported metrics, fabricated testimonials, placeholder project descriptions and contact forms that simulate delivery without a backend.

## Featured work

- **Cognify OS** — AI agent and MCP tool governance control plane. The web application is deployed; the source repository is private and is intentionally not linked.
- **X.Group** — automation infrastructure and operating-layer product. Public source and live web presence are linked from the case study.
- **PhishSwipe** — browser-based phishing-awareness game using fictional scenarios and browser-local data.
- **AUZBIZ** — Next.js travel-services application codebase covering enquiries, sample fare analysis, tours and content management.
- **SPECTRA-GNN** — academic research manuscript in progress; not presented as a publication.

## Structure

- `index.html` — homepage and portfolio overview
- `projects/index.html` — filterable project case studies
- `contact.html` — direct contact links (mailto; no simulated form)
- `blog/index.html` — published notes index
- `_layouts/` and `_includes/` — shared Jekyll shell
- `assets/css/portfolio.css` — responsive design system
- `assets/js/portfolio.js` — navigation, reveal and project filtering interactions
- `assets/favicon.svg` — site mark

## Local preview

The site has no JavaScript build step or package manager requirement. With Ruby and Bundler installed:

```bash
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000.

## Deployment

The repository name is `mueezahmed455.github.io`, so GitHub Pages can publish the root of the default branch as the personal site. The current source is Jekyll-compatible and does not require a Vercel project or a separate build pipeline.

After reviewing the redesign branch, merge it into `main` and confirm the Pages deployment in the repository's Actions / Pages settings.

## Content policy

Project stage, deployment status, source availability and research maturity are described separately. Add measured performance figures only when they have a reproducible source, and publish research claims only after the relevant analysis and review are complete.
