import { test, expect } from '@playwright/test';

    //abrir la home
    test('Abrir la página de New Balance Argentina', async ({ page }) => {
  
        await page.goto('https://www.newbalance.com.ar/');
        await expect(page).toHaveTitle(/new balance/i);
        await expect(page.locator('header')).toBeVisible();
        await page.waitForTimeout(2000);
   
    });

    // Buscar zapatilla
    test('Buscar zapatilla caja de busqueda', async ({ page }) => {
        await page.goto('https://www.newbalance.com.ar/');
        await page.locator("//div[@class='search hidden-xs-down']//input[@placeholder='Buscar...']").fill('running');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.getByText(/Resultados de la búsqueda/i)).toBeVisible();
        await page.waitForTimeout(2000);

    });

    //Seleccionar zapatilla
    test('Seleccionar zapatilla', async ({ page }) => {
        
        await page.goto('https://www.newbalance.com.ar/');
        await page.locator("//div[@class='search hidden-xs-down']//input[@placeholder='Buscar...']").fill('running');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.getByText(/Resultados de la búsqueda/i)).toBeVisible();
        await page.locator("//img[@id='img-N3R014000']").click(); 
        await page.waitForTimeout(2000);    

    });

    test('Seleccionar talle y color', async ({ page }) => {
        
        await page.goto('https://www.newbalance.com.ar/');
        await page.waitForTimeout(2000);
        await page.locator('//a[@href=\'#__cn_close_content\']').click({ timeout: 2000 }).catch(() => {}); //cerrar popup
        await page.locator("//div[@class='search hidden-xs-down']//input[@placeholder='Buscar...']").fill('running');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded'); // Espera a que cargue la página de resultados
        await expect(page.getByText(/Resultados de la búsqueda/i)).toBeVisible(); //Espera a que el DOM esté cargado.
        await page.locator("//img[@id='img-N3R014000']").click(); //talle
        await page.getByRole('button', { name: 'Seleccionar color red' }).click(); //color
       
        await page.pause()

        //await page.waitForTimeout(2000);    

    });
    


    



    