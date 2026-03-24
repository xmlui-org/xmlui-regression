import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('add-user', async ({ page }) => {
  test.setTimeout(15000);

  try {
    await page.goto('./');

    // Wait for DataSource to load
    await page.waitForResponse(r => r.url().includes('jsonplaceholder.typicode.com/users'));
    await page.getByRole('button', { name: 'Add User' }).waitFor();

    // Click Add User to open modal
    await page.getByRole('button', { name: 'Add User' }).click();

    // Try to submit empty form — should trigger validation errors
    await page.getByRole('button', { name: 'Save' }).click();

    // Fill in name only, submit again — email validation should fire
    await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
    await page.getByRole('button', { name: 'Save' }).click();

    // Fill in valid email and submit
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify user appears
    await expect(page.getByText('Test User')).toBeVisible();
  } finally {
    await captureTrace(page);
  }
});
