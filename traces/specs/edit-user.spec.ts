import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('edit-user', async ({ page }) => {
  test.setTimeout(60000);

  try {
    await page.goto('./');

    // Wait for DataSource to load and populate table
    await page.waitForResponse(r => r.url().includes('jsonplaceholder.typicode.com/users'));
    await page.getByRole('table', { name: 'User list' }).waitFor();

    // Click Edit on the first user row
    await page.getByRole('button', { name: /^Edit/ }).first().click();

    // Modal should open with "Edit User" title and pre-filled fields
    await expect(page.getByText('Edit User')).toBeVisible();

    // Clear name and type new one
    await page.getByLabel('Name').fill('Updated Name');

    // Submit the edit
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify updated name appears in table
    await expect(page.getByRole('cell', { name: 'Updated Name' })).toBeVisible();
  } finally {
    await captureTrace(page);
  }
});
