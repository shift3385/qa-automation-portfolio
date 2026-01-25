import { type Page, type Locator } from '@playwright/test';

export class CheckoutCompletePage {
  private readonly page: Page;
  private readonly title: Locator;
  private readonly completeHeader: Locator;
  // TU TAREA: Define propiedad para el encabezado del mensaje

  constructor(page: Page) {
    this.page = page;
    
    // -------------------------------------------------------------------------
    // TU TAREA 1: Encuentra el selector del mensaje "Thank you for your order!"
    // URL: checkout-complete.html
    // -------------------------------------------------------------------------
    // this.completeHeader = page.locator('???');
    this.title = page.locator('[data-test="title"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  /**
   * TU TAREA 2: Retorna el texto del mensaje de éxito.
   */
  async getSuccessMessage(): Promise<string> {
    return await this.completeHeader.innerText();
  }

  async getTitleText(): Promise<string> {
    // .innerText() obtiene el texto visible del elemento
    return await this.title.innerText();
  }
}
