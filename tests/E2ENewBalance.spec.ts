import { test, expect } from '@playwright/test';
import 'dotenv/config'; // carga credenciales del archivo .env 


    // ---Flujo inicial --    
    test('E2E NB user registrado', async ({ page }) => {

        //console.log('Email leído desde .env:', process.env.E2E_EMAIL);
        //console.log('Pass leído desde .env:', process.env.E2E_PASS);
        //-- Ir a sitio-- 
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

        // --- Hacer login user registrado ---
        const email = process.env.E2E_EMAIL;
        const password = process.env.E2E_PASS;

        await page.locator("//input[@id='login-form-email']").fill(email);
        await page.locator("//input[@id='login-form-password']").fill(password);
        await page.getByRole('button', { name: /iniciar sesión/i }).click();
        await expect(page).toHaveURL(/checkout/i);    // Validar que sigas en el checkout
        // await page.pause()

        // completar form 
       
        const calle = process.env.E2E_calle;
        const altura= process.env.E2E_altura;
        const dni= process.env.E2E_dni;
        const telefono= process.env.E2E_telefono;

        await page.locator("//input[@id='shippingAddressOnedefault']").fill(calle);
        await page.locator("//input[@id='shippingAddressTwodefault']").fill(altura);
        await page.locator("//div[@class='single-shipping']//div[6]//div[1]//div[1]//input[1]").fill(dni);
        await page.locator("//input[@id='shippingPhoneNumberdefault']").fill(telefono);
        await page.pause()
        
        });

    



  

  

    



    