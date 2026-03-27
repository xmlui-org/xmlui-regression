import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('tab-switch', async ({ page }) => {
  test.setTimeout(60000);

  try {
    await page.goto('./');

    // Wait for app to load - Users page is the default
    await page.waitForResponse(r => r.url().includes('/api/users'));

    // Should start on Users page
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();

    // Navigate to Settings via NavLink
    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

    // Navigate to About via NavLink
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByText('XMLUI Regression Test App')).toBeVisible();

    // Navigate back to Users via NavLink
    await page.getByRole('link', { name: 'Users' }).click();
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
  } finally {
    await captureTrace(page);
  }
});
