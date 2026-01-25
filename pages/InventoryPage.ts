import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly inventoryList: Locator;
  private readonly cartBadge: Locator;
  private readonly sortContainer: Locator;
  private readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  // Verifica si la lista de productos se carga en pantalla
  async isInventoryListVisible(): Promise<boolean> {
    return await this.inventoryList.isVisible();
  }

  /**
   * Cambia el orden de los productos.
   * @param option Los valores pueden ser: 'az', 'za', 'lohi', 'hilo'
   */
  async sortProductsBy(option: string) {
    await this.sortContainer.selectOption(option);
  }

  /**
   * Obtiene todos los precios de los productos visibles como números.
   */
  async getAllPrices(): Promise<number[]> {
    const priceStrings = await this.itemPrices.allTextContents();
    return priceStrings.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Obtiene todos los nombres de los productos visibles.
   */
  async getAllProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  /**
   * Hace clic en el icono del carrito para ir a la página de carrito.
   */
  async goToCart() {
    await this.cartBadge.click();
  }

  // Busca si existe un texto (nombre de producto) específico en la página
  async hasProduct(productName: string): Promise<boolean> {
    const product = this.page.locator('.inventory_item_name', { hasText: productName });
    return (await product.count()) > 0;
  }

  /**
   * Agrega un producto al carrito.
   * La lógica es: Buscar el contenedor del producto por su nombre y luego hacer clic en SU botón.
   */
  async addItemToCart(productName: string) {
    const productContainer = this.page.locator('.inventory_item', { hasText: productName });
    await productContainer.locator('button').click();
  }

  /**
   * Verifica si el botón 'Remove' es visible para un producto específico.
   */
  async isRemoveButtonVisible(productName: string): Promise<boolean> {
    const productContainer = this.page.locator('.inventory_item', { hasText: productName });
    const removeButton = productContainer.locator('button', { hasText: 'Remove' });
    return await removeButton.isVisible();
  }

  /**
   * Obtiene el número que muestra el carrito.
   * Si no hay productos, el elemento no existe, por lo que devolvemos '0'.
   */
  async getCartCount(): Promise<string> {
    if (await this.cartBadge.isVisible()) {
      return await this.cartBadge.innerText();
    }
    return '0';
  }
}
