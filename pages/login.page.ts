import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly invalidCredentialsMessage: Locator;
    
    constructor(private readonly page: Page) {
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login'});
        this.invalidCredentialsMessage = page.getByText('Invalid credentials');
    }

    async visitLogin(): Promise<void> {
        await this.page.goto('/web/index.php/auth/login')
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async validateUserMessageInvalid(){
        await expect(this.invalidCredentialsMessage).toBeVisible();
    }
}