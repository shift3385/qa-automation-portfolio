import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import loginData from '../data/loginData.json';

test.describe('Checkout End-to-End Flow', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
  });

  test('should complete the checkout process successfully', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';

    // 1. Agregar y Validar Carrito
    await inventoryPage.addItemToCart(productName);
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);
    expect(await cartPage.hasProduct(productName)).toBeTruthy();
    await cartPage.proceedToCheckout();

    // 2. Llenar Formulario
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await checkoutPage.fillInformation('Juan', 'Perez', '12345');

    // 3. Validar Paso 2 (Overview)
    await expect(page).toHaveURL(/checkout-step-two.html/);
    
    // Validamos que el producto correcto está en el resumen
    const hasItem = await checkoutOverviewPage.hasProduct(productName);
    expect(hasItem).toBeTruthy();
    
    // 4. Finalizar
    await checkoutOverviewPage.finishOrder();

    // 5. Validar Completado
    await expect(page).toHaveURL(/checkout-complete.html/);
    
    const successMsg = await checkoutCompletePage.getSuccessMessage();
    // Aserción final profesional: Validamos el mensaje de éxito real
    expect(successMsg).toBe('Thank you for your order!');
  });
});