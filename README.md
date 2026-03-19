# Mueez Ahmed Portfolio

A manga-styled portfolio website built with Jekyll for GitHub Pages.

## Local Development

### Prerequisites

- Ruby 3.x installed
- Bundler installed (`gem install bundler`)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bundle install
   ```

### Running Locally

```bash
bundle exec jekyll serve
```

Then open `http://localhost:4000` in your browser.

### Building

```bash
bundle exec jekyll build
```

## Deployment

This site is automatically deployed to GitHub Pages when you push to the `main` branch.

## Project Structure

```
├── _config.yml          # Site configuration
├── _includes/           # Reusable HTML components
├── _layouts/            # HTML layouts
├── _projects/           # Project collection
├── _posts/              # Blog posts
├── assets/
│   ├── css/             # SCSS stylesheets
│   ├── js/              # JavaScript files
│   └── img/             # Images and icons
├── blog/                # Blog index
└── projects/            # Projects index
```

## Features

- Manga/anime-inspired design
- Dark/light theme toggle
- Language toggle (EN/JP)
- Interactive chatbot
- Real-time SRE health monitoring
- Blockchain simulation
- JWT debugger
- WebAssembly Python runtime
- 3D visitor globe
- PWA support with service worker

## License

MIT
