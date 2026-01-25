import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import loginData from '../data/loginData.json';

test.describe('Product Inventory Flow', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  // Antes de cada test, necesitamos estar logueados
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    const { username, password } = loginData.validUser;
    await loginPage.login(username, password);
  });

  test('should display inventory items after login', async ({ page }) => {
    // Validamos que la URL después del login sea la de inventario
    await expect(page).toHaveURL(/inventory.html/);
    
    // Validamos que la lista de productos sea visible (Aserción de UI)
    const isVisible = await inventoryPage.isInventoryListVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should find a specific product by name', async () => {
    // Definimos el producto que buscamos
    const productName = 'Sauce Labs Backpack';
    // Le preguntamos al Page Object si lo ve
    const hasProduct = await inventoryPage.hasProduct(productName);
    // Aserción: Esperamos que el resultado sea verdadero
    expect(hasProduct).toBeTruthy();
  });

  test('should add a product to the cart', async () => {
    const productName = 'Sauce Labs Backpack';
    // Acción: Agregar al carrito
    await inventoryPage.addItemToCart(productName);
    
    // VALIDACIÓN 1: El botón debe cambiar a 'Remove'
    const isRemoveVisible = await inventoryPage.isRemoveButtonVisible(productName);
    expect(isRemoveVisible).toBeTruthy();

    // VALIDACIÓN 2: El carrito debe mostrar '1'
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('should sort products by price (low to high)', async () => {
    await inventoryPage.sortProductsBy('lohi');
    const prices = await inventoryPage.getAllPrices();

    // Comparamos cada precio con el siguiente
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('should sort products by name (Z to A)', async () => {
    await inventoryPage.sortProductsBy('za');
    const names = await inventoryPage.getAllProductNames();

    // Aserción: Verificar orden Descendente (Z > A)
    for (let i = 0; i < names.length - 1; i++) {
      expect(names[i] >= names[i + 1]).toBeTruthy();
    }
  });
});