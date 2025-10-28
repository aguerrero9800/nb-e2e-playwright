import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

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
        //await page.waitForTimeout(2000);

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
   
    //seleccion talle y color, cerrar popup 
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
        await page.getByRole('button', { name: 'Seleccionar color black' }).click(); //color
        //await page.pause()

        //await page.waitForTimeout(2000);    

    });

    // agregar al carrito 
    test('Agregar al cart', async ({ page }) => {
        
        await page.goto('https://www.newbalance.com.ar/');
        await page.waitForTimeout(2000);
        await page.locator('//a[@href=\'#__cn_close_content\']').click({ timeout: 2000 }).catch(() => {}); //cerrar popup
        await page.locator("//div[@class='search hidden-xs-down']//input[@placeholder='Buscar...']").fill('running');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded'); // Espera a que cargue la página de resultados
        await expect(page.getByText(/Resultados de la búsqueda/i)).toBeVisible(); //Espera a que el DOM esté cargado.
        await page.locator("//img[@id='img-N3R014000']").click(); //talle
        await page.getByRole('button', { name: 'Seleccionar color red' }).click(); //color
        await page.locator("//button[@class='add-to-cart btn btn-outline-primary']").click(); // agregar producto al cart
        await page.waitForTimeout(2000);
        await page.locator("//div[@class='minicart-total hide-link-med']//img[@alt='flame icon']").click(); //click en cart
        await page.waitForTimeout(1000);
        await page.pause()

    });

    // Pulsar botón comprar
        test('Pulsar botón comprar mini cart', async ({ page }) => {
        
        // ---Flujo inicial --    
        await page.goto('https://www.newbalance.com.ar/');
        await page.waitForTimeout(1000);
        await page.locator('//a[@href=\'#__cn_close_content\']').click({ timeout: 1000 }).catch(() => {}); //cerrar popup
        await page.locator("//div[@class='search hidden-xs-down']//input[@placeholder='Buscar...']").fill('running');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded'); // Espera a que cargue la página de resultados
        await expect(page.getByText(/Resultados de la búsqueda/i)).toBeVisible(); //Espera a que el DOM esté cargado.

        //---Seleccionar Producto ---
        await page.locator("//img[@id='img-N3R014000']").click(); //talle
        await page.getByRole('button', { name: 'Seleccionar color red' }).click(); //color
        await page.locator("//button[@class='add-to-cart btn btn-outline-primary']").click(); // agregar producto al cart

        //--- Abrir minicar y pulsar pagar---
        await page.locator("//div[@class='minicart-total hide-link-med']//img[@alt='flame icon']").click(); //click en cart
        await page.getByRole('button',{ name: 'Pagar'}).click(); // hacer click en botón pagar minicart
        await page.waitForTimeout(1000);    
        
        //--- Validar pagina de checkout ---
        await page.waitForSelector('h2.page-title.checkout-page');
        await expect(page.locator('h2.page-title.checkout-page')).toHaveText(/Checkout/i);
        const checkoutText = await page.locator('h2.page-title.checkout-page').textContent();
        console.log('Texto encontrado:', checkoutText);
     

        await page.pause()

    });



  

  

    



    