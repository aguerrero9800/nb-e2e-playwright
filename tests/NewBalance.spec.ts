import { test, expect } from '@playwright/test';

    test ('Abrir la página de New Balance Argentina', async ({ page }) => {
  
        await page.goto ('https://www.newbalance.com.ar/');
        await expect(page).toHaveTitle(/new balance/i);
        await expect(page.locator('header')).toBeVisible();
        await page.waitForTimeout(2000);
   
    });