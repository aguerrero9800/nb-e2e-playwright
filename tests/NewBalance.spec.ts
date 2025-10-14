import { test, expect } from '@playwright/test';

    //abrir la home
    test('Abrir la página de New Balance Argentina', async ({ page }) => {
  
        await page.goto('https://www.newbalance.com.ar/');
        await expect(page).toHaveTitle(/new balance/i);
        await expect(page.locator('header')).toBeVisible();
        await page.waitForTimeout(2000);
   
    });

    // Buscar zapatilla
    test('Buscar zapatilla cuadro busqueda', async ({ page }) => {
        await page.goto('https://www.newbalance.com.ar/');
        await page.locator("//div[@class='search hidden-xs-down']//input[@placeholder='Buscar...']").fill('running');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.getByText(/Resultados de la búsqueda/i)).toBeVisible();
        await page.waitForTimeout(2000);

                 
        
    });



    