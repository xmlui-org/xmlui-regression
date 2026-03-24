import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('select-filter', async ({ page }) => {
  test.setTimeout(60000);

  try {
    await page.goto('./');

    // Wait for DataSource to load
    await page.waitForResponse(r => r.url().includes('jsonplaceholder.typicode.com/users'));
    await page.getByRole('table', { name: 'User list' }).waitFor();

    // First add a user with no phone (the seeded users from jsonplaceholder have phones)
    await page.getByRole('button', { name: 'Add User' }).click();
    await page.getByLabel('Name').fill('No Phone User');
    await page.getByLabel('Email').fill('nophone@test.com');
    await page.getByRole('button', { name: 'Save' }).click();

    // Now use the phone filter Select
    await page.getByRole('combobox', { name: 'Phone filter' }).click();
    await page.getByRole('option', { name: 'Has phone' }).click();

    // Filtered table should appear and not contain our phoneless user
    await expect(page.getByText('No Phone User')).not.toBeVisible();

    // Switch to "No phone" filter
    await page.getByRole('combobox', { name: 'Phone filter' }).click();
    await page.getByRole('option', { name: 'No phone' }).click();

    // Now our phoneless user should be visible
    await expect(page.getByText('No Phone User')).toBeVisible();
  } finally {
    await captureTrace(page);
  }
});
