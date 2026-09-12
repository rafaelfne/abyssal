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

test('renders six station module controls and supports accessible selection', async ({
  page,
}) => {
  await page.goto('/expedition');
  await expect(
    page.locator('.map-host[data-map-ready="true"] canvas'),
  ).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Station map camera controls' }),
  ).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Station module selection' }),
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Habitation module' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Hydroponic cultivator' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Tidal generator' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Water and air purifier' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Laboratory' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Submersible dock' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Laboratory' }).click();
  await expect(
    page.locator('.map-status').getByText('Laboratory'),
  ).toBeVisible();
  await expect(
    page
      .locator('.map-status')
      .getByText('Analysis, discoveries and expedition research.'),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Laboratory' }),
  ).toHaveAttribute('aria-pressed', 'true');
});

test('supports touch map selection and camera controls on the expedition map', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile-chromium',
    'Mobile viewport only',
  );
  await page.goto('/expedition');
  await expect(
    page.locator('.map-host[data-map-ready="true"] canvas'),
  ).toBeVisible();

  await page.locator('.map-host canvas').tap({
    position: { x: 330, y: 420 },
  });
  await expect(
    page.locator('.map-status').getByText('Submersible dock'),
  ).toBeVisible();

  await page
    .getByRole('button', { name: 'Zoom in' })
    .evaluate((element: HTMLButtonElement) => element.click());
  await expect
    .poll(async () => {
      const zoomAfterIncrease = await page
        .locator('.map-status span')
        .textContent();
      return Number(zoomAfterIncrease?.match(/\d+/)?.[0]);
    })
    .toBeGreaterThan(105);

  await page
    .getByRole('button', { name: 'Reset view' })
    .evaluate((element: HTMLButtonElement) => element.click());
  await expect(
    page.locator('.map-status').getByText(/Zoom 105%/),
  ).toBeVisible();
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
