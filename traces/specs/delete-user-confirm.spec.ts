import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('delete-user-confirm', async ({ page }) => {
  test.setTimeout(60000);

  try {
    await page.goto('./');

    // Wait for DataSource to load and populate table
    await page.waitForResponse(r => r.url().includes('jsonplaceholder.typicode.com/users'));
    await page.getByRole('table', { name: 'User list' }).waitFor();

    // Remember the first user's name for verification
    const firstRow = page.getByRole('row').nth(1); // skip header
    const userName = await firstRow.getByRole('cell').nth(1).textContent();

    // Click Delete on the first user
    await page.getByRole('button', { name: /^Delete/ }).first().click();

    // Confirmation dialog should appear
    await expect(page.getByText(/Delete .+\?/)).toBeVisible();

    // Confirm deletion
    await page.getByRole('button', { name: 'Ok' }).click();

    // Verify user is gone from table
    await expect(page.getByRole('cell', { name: userName! })).not.toBeVisible();
  } finally {
    await captureTrace(page);
  }
});
