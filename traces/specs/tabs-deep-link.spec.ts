import { test, expect } from '@playwright/test';
import { captureTrace } from '../trace-capture';

test('tabs-deep-link', async ({ page }) => {
  test.setTimeout(20000);

  try {
    await page.goto('./');

    // Expand the Layout & Interaction nav group, then navigate
    await page.getByRole('button', { name: 'Layout & Interaction' }).click();
    await page.getByRole('link', { name: 'Tabs & deep links' }).click();
    await page.getByText('This is the Overview panel.').waitFor();

    // Verify Overview tab is active by default
    await expect(page.getByText('This is the Overview panel.')).toBeVisible();

    // Click Details tab
    await page.getByRole('tab', { name: 'Details' }).click();
    await expect(page.getByText('This is the Details panel.')).toBeVisible();

    // Click Settings tab
    await page.getByRole('tab', { name: 'Settings' }).click();
    await expect(page.getByText('This is the Settings panel.')).toBeVisible();

    // Toggle a checkbox
    await page.getByRole('checkbox', { name: 'Enable notifications' }).click();

    // Use programmatic navigation: Go to Overview button
    await page.getByRole('button', { name: 'Go to Overview' }).click();
    await expect(page.getByText('This is the Overview panel.')).toBeVisible();

    // Use Next button to cycle through
    await page.getByRole('button', { name: 'Next tab' }).click();
    await expect(page.getByText('This is the Details panel.')).toBeVisible();

    // Use Previous button
    await page.getByRole('button', { name: 'Previous tab' }).click();
    await expect(page.getByText('This is the Overview panel.')).toBeVisible();

  } finally {
    await captureTrace(page);
  }
});
