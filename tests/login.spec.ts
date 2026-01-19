import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/loginData.json';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const { username, password } = loginData.validUser;
    await loginPage.login(username, password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should show error message with invalid credentials', async () => {
    const { username, password } = loginData.invalidUser;
    await loginPage.login(username, password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(loginData.errorMessages.invalid);
  });

  test('should show error message for locked out user', async () => {
    const { username, password } = loginData.lockedUser;
    await loginPage.login(username, password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(loginData.errorMessages.locked);
  });
});