import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('list-context-menu', async ({ page }) => {
  test.setTimeout(20000);

  try {
    await page.goto('./');

    // Navigate to List & context menu page
    await page.getByRole('button', { name: 'Layout & Interaction' }).click();
    await page.getByRole('link', { name: 'List & context menu' }).click();
    await page.getByRole('status', { name: 'last action' }).waitFor();

    // Right-click Dashboard row to open context menu, click Edit
    await page.getByLabel('Dashboard row').click({ button: 'right' });
    await page.getByRole('menuitem', { name: 'Edit feature' }).click();

    // Right-click Analytics row, click Duplicate
    await page.getByLabel('Analytics row').click({ button: 'right' });
    await page.getByRole('menuitem', { name: 'Duplicate feature' }).click();

    // Right-click Reports row, click Archive
    await page.getByLabel('Reports row').click({ button: 'right' });
    await page.getByRole('menuitem', { name: 'Archive feature' }).click();

  } finally {
    await captureTrace(page);
  }
});
