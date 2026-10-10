import { test, expect } from '@playwright/test';

test('login page renders the form', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Đăng nhập' })).toBeVisible();
  await expect(page.getByLabel('Tên đăng nhập')).toBeVisible();
  await expect(page.getByLabel('Mật khẩu')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Đăng nhập' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Đăng ký' })).toBeVisible();
});

test('register page renders and links back to login', async ({ page }) => {
  await page.goto('/register');
  await expect(page.getByRole('heading', { name: 'Đăng ký' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Đăng ký' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Đăng nhập' })).toBeVisible();
});

test('home shows a login link when signed out and it navigates to /login', async ({ page }) => {
  await page.goto('/');
  const loginLink = page.getByRole('link', { name: 'Đăng nhập' });
  await expect(loginLink).toBeVisible();
  await loginLink.click();
  await expect(page).toHaveURL(/\/login$/, { timeout: 15_000 });
});
