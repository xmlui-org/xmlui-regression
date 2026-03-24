import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('tab-switch', async ({ page }) => {
  test.setTimeout(60000);

  try {
    await page.goto('./');

    // Wait for app to load
    await page.waitForResponse(r => r.url().includes('jsonplaceholder.typicode.com/users'));

    // Should start on Users tab
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();

    // Switch to Settings tab
    await page.getByRole('tab', { name: 'Settings' }).click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

    // Switch to About tab
    await page.getByRole('tab', { name: 'About' }).click();
    await expect(page.getByText('XMLUI Regression Test App')).toBeVisible();

    // Switch back to Users tab
    await page.getByRole('tab', { name: 'Users' }).click();
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
  } finally {
    await captureTrace(page);
  }
});
