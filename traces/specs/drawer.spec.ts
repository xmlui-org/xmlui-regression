import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('drawer', async ({ page }) => {
  test.setTimeout(20000);

  try {
    await page.goto('./');

    // Navigate to Drawer page
    await page.getByRole('button', { name: 'Layout & Interaction' }).click();
    await page.getByRole('link', { name: 'Drawer' }).click();
    await page.getByText('Slide-in panels from different edges').waitFor();

    // Open left drawer, verify content, close it
    await page.getByRole('button', { name: 'Open left drawer' }).click();
    await expect(page.getByText('Navigation panel content')).toBeVisible();
    await page.getByRole('button', { name: 'Close left drawer' }).click();
    await expect(page.getByText('Navigation panel content')).not.toBeVisible();

    // Open right drawer, verify content, close it
    await page.getByRole('button', { name: 'Open right drawer' }).click();
    await expect(page.getByText('Details panel content')).toBeVisible();
    await page.getByRole('button', { name: 'Close right drawer' }).click();

    // Open bottom drawer, verify content, close it
    await page.getByRole('button', { name: 'Open bottom drawer' }).click();
    await expect(page.getByText('Action sheet content')).toBeVisible();
    await page.getByRole('button', { name: 'Close bottom drawer' }).click();

    // Open settings drawer, interact with controls, apply
    await page.getByRole('button', { name: 'Open settings drawer' }).click();
    await page.getByRole('checkbox', { name: 'Enable dark mode' }).click();
    await page.getByRole('button', { name: 'Apply settings' }).click();

  } finally {
    await captureTrace(page);
  }
});
