import { expect, test } from '@playwright/test';

async function press(page, labels) {
  for (const label of labels) {
    await page.getByRole('button', { name: label, exact: true }).click();
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('calculates a complete addition flow', async ({ page }) => {
  await press(page, ['1', '2', '+', '7', '=']);

  await expect(page.getByLabel('Calculator display')).toHaveText('19');
});

test('clear resets the display to zero', async ({ page }) => {
  await press(page, ['9', '×', '8', 'C']);

  await expect(page.getByLabel('Calculator display')).toHaveText('0');
});

test('divide by zero shows graceful output', async ({ page }) => {
  await press(page, ['8', '÷', '0', '=']);

  await expect(page.getByLabel('Calculator display')).toHaveText('Error');
});
