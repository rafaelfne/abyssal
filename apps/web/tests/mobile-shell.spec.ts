import { expect, test } from '@playwright/test';

test('loads the foundation shell without horizontal overflow', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Abyssal Colony Manager' }),
  ).toBeVisible();
  await expect(page.getByText('Foundation online')).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions).toEqual({ clientWidth: 390, scrollWidth: 390 });
});
