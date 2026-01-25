import { type Page, type Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  private readonly page: Page;
  // TU TAREA: Define los tipos de las propiedades que te falten
  // private readonly finishButton: Locator; 
  // private readonly ...
  private readonly title: Locator;
  private readonly paymentInformation: Locator;
  private readonly shippingInformation: Locator;
  private readonly priceTotal: Locator;
  private readonly finish: Locator;
  private readonly cancel: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // -------------------------------------------------------------------------
    // TU TAREA 1: Encuentra los selectores en 'checkout-step-two.html'
    // -------------------------------------------------------------------------
    // this.finishButton = page.locator('???'); 
    // this.inventoryItemName = page.locator('???');

    this.title = page.locator('[data-test="title"]');
    this.paymentInformation = page.locator('[data-test="payment-info-label"]');
    this.shippingInformation = page.locator('[data-test="shipping-info-label"]');
    this.priceTotal = page.locator('[data-test="total-info-label"]');
    this.finish = page.locator('[data-test="finish"]');
    this.cancel = page.locator('[data-test="cancel"]');
  }

  /**
   * TU TAREA 2: Crea el método para hacer clic en Finish
   */
  async finishOrder() {
    await this.finish.click();
  }
  
  // Agregado por ti (Excelente adición)
  async cancelOrder() {
    await this.cancel.click();
  }

  /**
   * Valida que un producto está en el resumen buscando por su texto.
   */
  async hasProduct(productName: string): Promise<boolean> {
    // Buscamos un item del inventario que contenga el texto del producto
    const product = this.page.locator('.inventory_item_name', { hasText: productName });
    return await product.isVisible();
  }

  // --- Métodos para validar las nuevas propiedades ---

  async getTitleText(): Promise<string> {
    // .innerText() obtiene el texto visible del elemento
    return await this.title.innerText();
  }

  async isPaymentInfoVisible(): Promise<boolean> {
    return await this.paymentInformation.isVisible();
  }

  async isShippingInfoVisible(): Promise<boolean> {
    return await this.shippingInformation.isVisible();
  }

  /**
   * Obtiene el texto del total (ej: "Total: $32.39")
   * Útil para validar que el cálculo sea correcto.
   */
  async getTotalLabelText(): Promise<string> {
    return await this.priceTotal.innerText();
  }
}
