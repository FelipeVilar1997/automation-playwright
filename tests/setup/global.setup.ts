import {
  chromium,
  expect,
  type FullConfig,
} from '@playwright/test';

import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { users } from '../../test-data/user';

const authFile = 'playwright/.auth/admin.json';

async function globalSetup(config: FullConfig): Promise<void> {
  const project = config.projects.find(
    project => project.name === 'chromium',
  );

  const baseURL = project?.use.baseURL;

  if (!baseURL) {
    throw new Error('baseURL was not configured');
  }

  const browser = await chromium.launch();

  const context = await browser.newContext({
    baseURL: baseURL as string,
  });

  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  console.log('[SETUP] Authenticating administrator');

  await loginPage.visitLogin();

  await loginPage.login(
    users.admin.username,
    users.admin.password,
  );

  await expect(page).toHaveURL(/dashboard/);

  await dashboardPage.validateDashboard();

  await context.storageState({
    path: authFile,
  });

  console.log('[SETUP] Authentication state saved');

  await browser.close();
}

export default globalSetup;