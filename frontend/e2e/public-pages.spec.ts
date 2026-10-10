import { test, expect } from '@playwright/test';

test.describe('public pages', () => {
  test('home renders the app header and hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('AgriSmart Pro').first()).toBeVisible();
    await expect(page.getByText(/REVOLUTIONIZING AGRICULTURE/i)).toBeVisible();
  });

  test('community page renders', async ({ page }) => {
    await page.goto('/community');
    await expect(page.getByText('AgriSmart Pro').first()).toBeVisible();
  });

  test('marketplace page renders', async ({ page }) => {
    await page.goto('/marketplace');
    await expect(page.getByText('AgriSmart Pro').first()).toBeVisible();
  });
});
