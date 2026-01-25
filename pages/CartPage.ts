import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartItem: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Verifica si un producto específico está visible en el carrito.
   * @param productName El nombre exacto del producto.
   */
  async hasProduct(productName: string): Promise<boolean> {
    const product = this.cartItem.filter({ hasText: productName });
    return await product.isVisible();
  }

  /**
   * Navega hacia el proceso de checkout.
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
