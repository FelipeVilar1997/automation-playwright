import { test as setup } from '@playwright/test';

import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { users } from '../../test-data/user';

const authFile = 'playwright/.auth/admin.json';

setup('', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await setup.step('Acess login page', async () => {
        await loginPage.visitLogin();
    });

    await setup.step('Authenticate user administrator', async () => {
        await loginPage.login(
            users.admin.username,
            users.admin.password
        );
    });

    await setup.step('Validate authentication', async () => {
        await dashboardPage.validateDashboard();
    });

    await page.context().storageState({
        path: authFile,
    });

    console.log('COOKIES:',
        await page.context().cookies(),
    );

    console.log('LOCAL STORAGE:',
        await page.evaluate(() => ({ ...localStorage })),
    );

    console.log('SESSION STORAGE:',
        await page.evaluate(() => ({ ...sessionStorage })),
    );

    await page.context().storageState({
        path: authFile,
    });
});