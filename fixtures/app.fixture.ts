import { test as base, expect, } from '@playwright/test';

import { BuzzPage } from '../pages/buzz.page';
import { DashboardPage } from '../pages/dashboard.page';
import { Logger } from '../utils/logger.ts';

type AppFixtures = {
    dashboardPage: DashboardPage;
    buzzPage: BuzzPage;
    logger : Logger;
};

export const test = base.extend<AppFixtures>({
    dashboardPage: async ({ page }, use)=> {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    buzzPage: async ({ page }, use) => {
        const buzzPage = new BuzzPage(page);
        await use(buzzPage);
    },

    logger:  async ({}, use, testInfo) => {
        const logger = new Logger(testInfo.title);

        await use(logger);
    },
});

export { expect };