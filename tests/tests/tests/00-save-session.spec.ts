import { test, expect } from '@playwright/test';

test('Guardar sesión BM para acceder a DEV storefront', async ({ page }) => {
  // 1) Abrir BM Home (tu URL)
  await page.goto('https://development-na03-newbalance.demandware.net/on/demandware.store/Sites-Site/default;app=__bm_merchant;site=NewBalance/ViewBM-Home');

  // 2) IMPORTANTE: acá te logueás MANUALMENTE si te pide login/SSO
  // Cuando ya veas el BM Home, seguimos.

  await expect(page).toHaveURL(/ViewBM-Home|__bm_merchant/i, { timeout: 120000 });

  // 3) Ir al storefront DEV (el que te bloquea si no estás logueado)
  await page.goto('https://development-na03-newbalance.demandware.net/on/demandware.store/Sites-NewBalance-Site/default');

  await expect(page).toHaveURL(/Sites-NewBalance-Site/i, { timeout: 60000 });

  // 4) Guardar cookies/sesión
  await page.context().storageState({ path: 'storageState.json' });
});
