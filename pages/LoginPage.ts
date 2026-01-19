import { type Page, type Locator, test } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    const startTime = Date.now();
    
    // Mantenemos el timeout duro de 60s para evitar fallos de red en la prueba funcional
    await this.page.goto('https://www.saucedemo.com/', { timeout: 60000 });

    const duration = Date.now() - startTime;
    const idealTime = 3000;

    // Lógica de Alerta de Desempeño (No falla la prueba, solo avisa)
    if (duration > idealTime) {
      const message = `⚠️ PERFORMANCE ALERT: La carga tomó ${duration}ms, excediendo el ideal de ${idealTime}ms.`;
      
      // 1. Mostrar en consola para feedback inmediato
      console.warn(message);

      // 2. Agregar al reporte HTML oficial de Playwright
      test.info().annotations.push({
        type: 'Performance Warning',
        description: message
      });
    }
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}