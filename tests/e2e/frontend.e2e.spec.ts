import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('/')

    // Wait for app to finish initial network activity and render
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('body', { state: 'visible' })

    await expect(page).toHaveTitle(/Ambrosius/i)

    // Assert presence of expected copy anywhere on the page to avoid brittle selectors
    const body = page.locator('body')
    await expect(body).toContainText(/Ambrosius|Gereja|Welcome/i)
  })
})
