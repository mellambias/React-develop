// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173/';
const API_CAT_IMAGE = `https://cataas.com/cat/says/`;

test('Existe contenido', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const texto = await page.getByRole('paragraph');
  const imagen = await page.getByRole('img');

  const textContent = await texto.textContent();
  const imageSrc = await imagen.getAttribute('src');

  // Test
  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(API_CAT_IMAGE)).toBeTruthy();
});

