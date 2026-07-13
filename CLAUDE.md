# CLAUDE.md

## Verifying frontend/UI changes

Do not install or drive a headless browser (Playwright, Puppeteer, etc.) to
screenshot-verify changes — it's slow and burns tokens in this environment.
Instead, just start the dev server (`npm run dev`) and tell the user the URL
and what to look at. Let the user review it visually themselves.
