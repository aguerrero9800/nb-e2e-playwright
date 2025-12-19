import { test, expect } from '@playwright/test';
import 'dotenv/config'; // carga credenciales del archivo .env 



    // ---Flujo inicial E2E USER REGISTRADO--    
    //test('E2E NB user registrado', async ({ page }) => {

    test('E2E NB user registrado', async ({ page }) => {

    if (!process.env.E2E_MailInvitado) {
    throw new Error('Falta variable de entorno: E2E_MailInvitado');
  }

    //console.log('Email leído desde .env:', process.env.E2E_EMAIL);
    //console.log('Pass leído desde .env:', process.env.E2E_PASS);
    //-- Ir a sitio-- 

    const searchInput = page.locator("//div[@class='search hidden-xs-down']//input[@placeholder='Buscar...']");

    await page.goto('https://www.newbalance.com.ar/');
    console.log('URL placeorder:', page.url());
    await expect(page).toHaveURL(/www.newbalance.com.ar/);
    //await page.waitForTimeout(1000);
    await page.locator('//a[@href=\'#__cn_close_content\']').click({ timeout: 1000 }).catch(() => {}); //cerrar popup
    await searchInput.fill('running');
    await searchInput.press('Enter');
    await page.waitForLoadState('domcontentloaded'); // Espera a que cargue la página de resultados
    await expect(page.getByText(/Resultados de la búsqueda/i)).toBeVisible(); //Espera a que el DOM esté cargado.

    //---Seleccionar Producto ---
    await page.locator("//img[@id='img-N3R014000']").click(); //talle
    await page.getByRole('button', { name: 'Seleccionar color black' }).click(); //color
    await page.locator("//button[@class='add-to-cart btn btn-outline-primary']").click(); // agregar producto al cart

    //--- Abrir minicart y pulsar pagar---
    await page.locator("//div[@class='minicart-total hide-link-med']//img[@alt='flame icon']").click(); //click en cart
    await page.locator("//a[normalize-space()='Pagar']").click(); // hacer click en botón pagar cart
    await page.waitForTimeout(1000);    
        
    //--- Validar pagina de checkout ---
    await page.waitForSelector('h2.page-title.checkout-page');
    await expect(page.locator('h2.page-title.checkout-page')).toHaveText(/Checkout/i);
    const checkoutText = await page.locator('h2.page-title.checkout-page').textContent();
    console.log('Texto encontrado:', checkoutText);

    // --- Hacer login user registrado ---
    const email = process.env.E2E_EMAIL as string;
    const password = process.env.E2E_PASS as string;

    await page.locator("//input[@id='login-form-email']").fill(email);
    await page.locator("//input[@id='login-form-password']").fill(password);
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await expect(page).toHaveURL(/checkout/i);    // Validar que sigas en el checkout
    // await page.pause()

    // completar form 
       
    const calle = process.env.E2E_calle as string;
    const altura= process.env.E2E_altura as string;
    const dni= process.env.E2E_dni as string;
    const telefono= process.env.E2E_telefono as string;
    const pais= process.env.E2E_Pais as string;
    const provincia= process.env.E2E_Provincia as string;
    const ciudad= process.env.E2E_Ciudad as string;
    const CP= process.env.E2E_CP as string;
    const cpInput = page.locator("//input[@id='shippingZipCodedefault']");
    
    await page.locator("//input[@id='shippingAddressOnedefault']").fill(calle);
    await page.locator("//input[@id='shippingAddressTwodefault']").fill(altura);
    await page.locator("//input[@id='dni']").fill(dni);
    await page.locator("//input[@id='shippingPhoneNumberdefault']").fill(telefono);
    await page.locator("//select[@id='shippingCountrydefault']").selectOption({label:pais});
    await page.locator("//select[@id='shippingStatedefault']").selectOption({label:provincia});
    await page.locator("//input[@id='shippingAddressCitydefault']").fill(ciudad);
    await cpInput.waitFor({ state: 'visible' }); // se hizo así para asegurar que se poble el campo cp
    await cpInput.fill('');
    await cpInput.type(CP, { delay: 50 });
              
    await page.getByRole('button',{ name: 'Siguiente: Método de Pago'}).click();
      
    // checkout payment

    //const genero = process.env.E2E_genero;
    //const Nacimiento = process.env.E2E_Nacimiento;
    const birthdayInput = page.locator('#birthday');
    const mpTab = page.locator('li[data-method-id="CHECKOUT_PRO"] a');
     
    //await birthdayInput.fill(Nacimiento);
    await expect(mpTab).toBeVisible();
    await mpTab.click();
    await mpTab.click();
    await expect(page.locator('li[data-method-id="CHECKOUT_PRO"]')).toHaveClass(/active/);
    await page.getByRole('button',{ name: 'Siguiente: Realizar Pedido'}).click();

    // validar checkout 
        
    console.log('URL placeorder:', page.url());
    await expect(page).toHaveURL(/checkout\?stage=placeOrder/);
    await page.getByRole('button',{ name: 'Realizar Pedido'}).click();

    //await page.pause();

    // se redirige a la pasarela de pago       
    });

    // mismo flujo hasta checkout
    //test('E2E NB user invitado', async ({ page }) => {
       test('E2E NB user invitado-checkout', async ({ page }) => {

       if (!process.env.E2E_MailInvitado) {
       throw new Error('Falta variable de entorno: E2E_MailInvitado');
       }
        //console.log('Email leído desde .env:', process.env.E2E_EMAIL);
       
        //-- Ir a sitio-- 
                 
        await page.goto('https://www.newbalance.com.ar/');
        console.log('URL placeorder:', page.url());
        await expect(page).toHaveURL(/www.newbalance.com.ar/);
        await page.locator('//a[@href=\'#__cn_close_content\']').click({ timeout: 1000 }).catch(() => {}); //cerrar popup
        await page.locator("//div[@class='search hidden-xs-down']//input[@placeholder='Buscar...']").fill('running');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded'); // Espera a que cargue la página de resultados
        await expect(page.getByText(/Resultados de la búsqueda/i)).toBeVisible(); //Espera a que el DOM esté cargado.

        //---Seleccionar Producto ---
        await page.locator("//img[@id='img-N3R014000']").click(); //talle
        await page.getByRole('button', { name: 'Seleccionar color black' }).click(); //color
        await page.locator("//button[@class='add-to-cart btn btn-outline-primary']").click(); // agregar producto al cart

        //--- Abrir cart y pulsar pagar---
        await page.locator("//div[@class='minicart-total hide-link-med']//img[@alt='flame icon']").click(); //click en cart
        await page.locator("//a[@class='btn btn-primary btn-block checkout-btn ga_CTA']").click(); // hacer click en botón pagar cart
        await page.waitForTimeout(1000);
        console.log('URL checkout:', page.url());
        await expect(page).toHaveURL(/Checkout-Login/);

        // Inciar checkout como invitado
        const MailInvitado = process.env.E2E_MailInvitado as string;

        await page.getByRole('link', { name: 'Pagar como Invitado' }).click(); 
        await page.locator("//input[@id='email-guest']").fill(MailInvitado);   
        await page.getByRole('button', { name: 'Continuar como Invitado' }).click();
        console.log('URL checkout:', page.url());
        await expect(page).toHaveURL(/stage=shipping#shipping/);
        
        // completar form compra invitado 
       
        const nombres= process.env.E2E_nombres as string;
        const apellidos= process.env.E2E_apellidos as string; 
        const calle = process.env.E2E_calle as string;
        const altura= process.env.E2E_altura as string;
        const dni= process.env.E2E_dni as string;
        const pais= process.env.E2E_Pais as string;
        const provincia= process.env.E2E_Provincia as string;
        const ciudad= process.env.E2E_Ciudad as string;
        const CP= process.env.E2E_CP as string;
        const cpInput = page.locator("//input[@id='shippingZipCodedefault']");
        const telefono= process.env.E2E_telefono as string;
    
        await page.locator("//input[@id='shippingFirstNamedefault']").fill(nombres);
        await page.locator("//input[@id='shippingLastNamedefault']").fill(apellidos);
        await page.locator("//input[@id='shippingAddressOnedefault']").fill(calle);
        await page.locator("//input[@id='shippingAddressTwodefault']").fill(altura);
        await page.locator("//input[@id='dni']").fill(dni);
        await page.locator("//input[@id='shippingPhoneNumberdefault']").fill(telefono);
        await page.locator("//select[@id='shippingCountrydefault']").selectOption({label:pais});
        await page.locator("//select[@id='shippingStatedefault']").selectOption({label:provincia});
        await page.locator("//input[@id='shippingAddressCitydefault']").fill(ciudad);
        await cpInput.waitFor({ state: 'visible' }); // se hizo así para asegurar que se poble el campo cp
        await cpInput.fill('');
        await cpInput.type(CP, { delay: 50 });
        await page.getByRole('button',{ name: 'Siguiente: Método de Pago'}).click();

        // validar checkout 
        
        console.log('URL placeorder:', page.url());
        await expect(page).toHaveURL(/stage=payment#payment/);
        await page.locator("//button[normalize-space()='Siguiente: Realizar Pedido']").click();

        console.log('URL placeorder:', page.url());
        await expect(page).toHaveURL(/stage=placeOrder#placeOrder/);
        await page.locator("//button[normalize-space()='Realizar Pedido']").click();

        // flujo ok hasta levantar pasarela de pago 

               

     // await page.pause();  

            
});


    



  

  

    



    