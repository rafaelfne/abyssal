import { expect, test } from '@playwright/test';

test('navigates from introduction to the expedition shell without overflow', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Abyssal Colony Manager' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Start expedition' }).press('Enter');
  await expect(page.getByText('Foundation online')).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
});

test('supports direct routes, focus restoration and unknown-route redirect', async ({
  page,
}) => {
  await page.goto('/crew/explorer');
  await expect(
    page.getByRole('heading', { name: 'Crew details' }),
  ).toBeFocused();
  await expect(page.getByText('Crew member explorer')).toBeVisible();
  await page.getByRole('link', { name: 'Report' }).press('Enter');
  await expect(page).toHaveURL('/report');
  await expect(
    page.getByRole('heading', { name: 'Report', exact: true }),
  ).toBeFocused();
  await page.goto('/not-a-route');
  await expect(page).toHaveURL('/');
  await expect(
    page.getByRole('heading', { name: 'Introduction', exact: true }),
  ).toBeFocused();
});

test('keeps primary controls touch-sized on desktop', async ({ page }) => {
  await page.goto('/');
  const size = await page
    .getByRole('link', { name: 'Start expedition' })
    .evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { height: rect.height, width: rect.width };
    });
  expect(size.height).toBeGreaterThanOrEqual(44);
  expect(size.width).toBeGreaterThanOrEqual(44);
});
