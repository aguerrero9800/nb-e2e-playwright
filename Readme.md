# 🧪 NB-E2E Playwright Project

**End-to-End (E2E) Test Automation Project** built with [Playwright](https://playwright.dev/) and TypeScript.  
This project automates functional scenarios over the real e-commerce site **[New Balance Argentina](https://www.newbalance.com.ar/)**  
to demonstrate professional QA automation skills for portfolio purposes.

---

## 🚀 Tech Stack
- **Language:** TypeScript  
- **Framework:** [@playwright/test](https://playwright.dev/docs/test-intro)  
- **Assertions:** Built-in Playwright `expect`  
- **Report:** Playwright HTML Report  
- **CI/CD:** GitHub Actions (optional setup ready)

---

## 🧩 Project Structure
NB-E2E/
├── tests/
│ ├── NewBalance.spec.ts # Main test suite (E2E Smoke)
│ └── example.spec.ts # Playwright default example
├── playwright.config.ts # Playwright configuration
├── package.json # NPM scripts
├── .gitignore # Ignored folders/files
└── README.md

## ⚙️ Setup & Run

### 1️⃣ Install dependencies
```bash
npm install

### 2️⃣ Run all tests (
npx playwright test

### 3️⃣ Run in headed mode (browser visible)
npx playwright test 

### 4️⃣ Show last HTML report
npx playwright show-report

✅ Current Scenario
test('Abrir la página de New Balance Argentina', async ({ page }) => {
  await page.goto('https://www.newbalance.com.ar/');
  await expect(page).toHaveTitle(/new balance/i);
  await expect(page.locator('header')).toBeVisible();
});

🟢 Goal: Verificar que la página de inicio se cargue correctamente y el encabezado principal esté visible.

🧠 Próximos pasos

Añadir prueba de búsqueda (escribir "zapatillas hombre" y validar los resultados)
Ir a la página de detalles del producto (PDP)
Añadir al carrito y verificar el resumen del carrito
Gestionar cookies y ventanas emergentes del boletín
Integrar el flujo de trabajo de GitHub Actions

👤 Author
## Adrián Guerrero
QA Analyst | Salesforce Specialist | QA Automation Learner
📍 Buenos Aires, Argentina

🧩 Este repositorio es parte de mi ruta de aprendizaje de automatización de pruebas utilizando sitios web de comercio electrónico del mundo real para fines de demostración de Portfolio.
