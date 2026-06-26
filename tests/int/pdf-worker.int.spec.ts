import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, it, expect } from 'vitest'

/**
 * Regression tests for the PDF.js worker/API version mismatch.
 *
 * PDF.js runs in a Web Worker that must be the exact same version as the API
 * (`pdfjs-dist`) we import. Previously the worker was a hand-copied snapshot in
 * `public/pdf.worker.min.mjs` that drifted out of date on every `npm update`,
 * producing: 'The API version "6.0.227" does not match the Worker version "5.4.54".'
 *
 * The fix resolves the worker from the installed package via
 * `new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url)`, so the
 * bundler emits a worker that always matches the library. These tests lock that
 * in and fail if the old, drift-prone pattern is reintroduced.
 */

const root = resolve(__dirname, '../..')

describe('PDF.js worker version', () => {
  it('ships a worker that matches the installed pdfjs-dist version', () => {
    const pkg = JSON.parse(
      readFileSync(resolve(root, 'node_modules/pdfjs-dist/package.json'), 'utf8'),
    )
    const worker = readFileSync(
      resolve(root, 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs'),
      'utf8',
    )

    // The worker build embeds its own version string; it must equal the API
    // (package) version, otherwise PDF.js refuses to run at runtime.
    expect(worker).toContain(`"${pkg.version}"`)
  })

  it('resolves the worker from the package, not a hardcoded static path', () => {
    const viewer = readFileSync(
      resolve(root, 'src/components/FlipbookViewer.tsx'),
      'utf8',
    )

    // The fix: let the bundler resolve the worker from node_modules so its
    // version is pinned to the installed library.
    expect(viewer).toContain(
      "new URL(\n          'pdfjs-dist/build/pdf.worker.min.mjs',\n          import.meta.url,\n        )",
    )

    // Guard against reintroducing the drift-prone static path.
    expect(viewer).not.toContain("workerSrc = '/pdf.worker.min.mjs'")
  })

  it('does not keep a stale committed worker in public/', () => {
    // A copy here is what drifted before; the bundler-resolved worker replaces it.
    expect(existsSync(resolve(root, 'public/pdf.worker.min.mjs'))).toBe(false)
  })
})
