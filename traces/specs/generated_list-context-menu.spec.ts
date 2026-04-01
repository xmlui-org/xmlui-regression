import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('list-context-menu', async ({ page }) => {

  // Platform-aware modifier key (Meta on macOS, Control on Windows/Linux)
  const _mod = process.platform === 'darwin' ? 'Meta' : 'Control';

  // Collect XMLUI runtime errors (ErrorBoundary, script errors, toast messages)
  const _xsErrors: string[] = [];
  const _modalsSeen: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') _xsErrors.push(msg.text());
    if (msg.text().startsWith('__MODAL__:')) _modalsSeen.push(msg.text().slice(10));
  });
  page.on('pageerror', err => _xsErrors.push(err.message));

  try {

  await page.goto('./');

  await test.step('click: Layout & Interaction', async () => {
    await page.getByText('Layout & Interaction', { exact: true }).click();
  });

  await test.step('click: List & context menu', async () => {
    await page.getByText('List & context menu', { exact: true }).click();
  });

  await test.step('right-click: Dashboard row', async () => {
    await page.getByLabel('Dashboard row', { exact: true }).click({ button: 'right' });
  });

  await test.step('click: Edit feature', async () => {
    await page.getByRole('menuitem', { name: 'Edit feature', exact: true }).click();
  });

  await test.step('right-click: Analytics row', async () => {
    await page.getByLabel('Analytics row', { exact: true }).click({ button: 'right' });
  });

  await test.step('click: Duplicate feature', async () => {
    await page.getByRole('menuitem', { name: 'Duplicate feature', exact: true }).click();
  });

  await test.step('right-click: Reports row', async () => {
    await page.getByLabel('Reports row', { exact: true }).click({ button: 'right' });
  });

  await test.step('click: Archive feature', async () => {
    await page.getByRole('menuitem', { name: 'Archive feature', exact: true }).click();
  });
  } finally {
    // Capture trace even on failure (if browser still open)
    try {
      await page.waitForTimeout(500);
      const logsJson = await page.evaluate(() => {
        const logs = (window as any)._xsLogs || [];
        const seen = new WeakSet();
        return JSON.stringify(logs, (_key, val) => {
          if (typeof val === 'function') return undefined;
          if (val && typeof val === 'object') {
            if (seen.has(val)) return '[Circular]';
            seen.add(val);
          }
          return val;
        }, 2);
      });
      const logs = JSON.parse(logsJson);
      const traceFile = process.env.TRACE_OUTPUT || 'captured-trace.json';
      fs.writeFileSync(traceFile, logsJson);
      console.log(`Trace captured to ${traceFile} (${logs.length} events)`);
      // Report XMLUI errors from _xsLogs
      const errors = logs.filter((e: any) => e.kind?.startsWith('error'));
      if (errors.length > 0) {
        console.log('\nXMLUI RUNTIME ERRORS:');
        errors.forEach((e: any) => console.log(`  [${e.kind}] ${e.error || e.text || JSON.stringify(e)}`));
      }
    } catch (e) {
      console.log('Could not capture trace (browser may have closed)');
    }
    // Report modals that appeared during the test
    if (_modalsSeen.length > 0) {
      console.log('\nMODALS:');
      _modalsSeen.forEach(m => console.log(`  ${m}`));
    }
    // Report visible table rows for diagnostics
    try {
      const rows = await page.evaluate(() =>
        Array.from(document.querySelectorAll('table tbody tr'))
          .map(r => (r as HTMLElement).innerText?.split('\t')[0]?.trim())
          .filter(Boolean)
      );
      if (rows.length > 0) {
        console.log('\nVISIBLE ROWS: ' + rows.join(', '));
      }
    } catch (_) {}
    // Report console errors collected during the test (opt-in via --browser-errors)
    if (false && _xsErrors.length > 0) {
      console.log('\nBROWSER ERRORS:');
      _xsErrors.forEach(e => console.log(`  ${e}`));
    }
  }
});
