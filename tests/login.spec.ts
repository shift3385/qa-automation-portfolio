import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/loginData.json';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;

  // El bloque 'beforeEach' se ejecuta antes de CADA una de las pruebas de abajo
  test.beforeEach(async ({ page }) => {
    // Inicializamos el Page Object pasándole la página actual
    loginPage = new LoginPage(page);
    // Navegamos a la URL base de la aplicación (SauceDemo)
    await loginPage.goto();
  });

  // PRUEBA 1: Caso de éxito (Camino feliz)
  test('should login successfully with valid credentials', async ({ page }) => {
    // Extraemos el usuario y contraseña del objeto 'validUser' de nuestro JSON
    const { username, password } = loginData.validUser;
    
    // Realizamos la acción de login usando los métodos del Page Object
    await loginPage.login(username, password);
    
    // VALIDACIÓN: Esperamos que después del login, la URL contenga 'inventory.html'
    await expect(page).toHaveURL(/inventory.html/);
  });

  // PRUEBA 2: Credenciales incorrectas
  test('should show error message with invalid credentials', async () => {
    // Usamos datos inválidos definidos en el JSON
    const { username, password } = loginData.invalidUser;
    
    // Intentamos loguearnos
    await loginPage.login(username, password);
    
    // Obtenemos el texto del mensaje de error que aparece en la web
    const errorMessage = await loginPage.getErrorMessage();
    
    // VALIDACIÓN: El mensaje debe contener el texto de error esperado del JSON
    expect(errorMessage).toContain(loginData.errorMessages.invalid);
  });

  // PRUEBA 3: Usuario bloqueado administrativamente
  test('should show error message for locked out user', async () => {
    // Usamos el usuario 'locked_out_user' definido en el JSON
    const { username, password } = loginData.lockedUser;
    
    await loginPage.login(username, password);
    
    const errorMessage = await loginPage.getErrorMessage();
    
    // VALIDACIÓN: El mensaje debe ser específicamente el de usuario bloqueado
    expect(errorMessage).toContain(loginData.errorMessages.locked);
  });
});
