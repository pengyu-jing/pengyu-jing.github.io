# Pengyu Jing — Academic Homepage

A lightweight, dependency-free academic personal website inspired by the structure of Tairan He's homepage.

## Preview locally

Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a public repository named `Kigazuto.github.io` (or any repository name).
2. Upload all files in this folder to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select the `main` branch and `/ (root)`.
4. The site will be published after GitHub Pages finishes building.

For a project repository rather than `Kigazuto.github.io`, relative links in this site already work under a subpath.

## Update content

- Main content: `index.html`
- Web CV: `cv.html`
- Styling: `assets/style.css`
- Profile image: replace `assets/profile.jpg`
- Publication figures: replace the corresponding PNG files in `assets/`

## Notes

- The site uses no build step and no third-party JavaScript packages.
- The CV page supports browser **Print / Save PDF**.
- Dark mode follows the system preference and can also be toggled manually.
