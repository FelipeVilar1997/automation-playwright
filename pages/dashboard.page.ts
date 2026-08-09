import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage{
    private readonly pageTitleDashboard: Locator;

    private readonly buttonMenuAdmin: Locator;
    private readonly buttonMenuPIM: Locator;
    private readonly buttonMenuLeave: Locator;
    private readonly buttonMenuTime: Locator;
    private readonly buttonMenuRecruiment: Locator;
    private readonly buttonMenuMyInfo: Locator;
    private readonly buttonMenuPerformance: Locator;
    private readonly buttonMenuDashboard: Locator;
    private readonly buttonMenuDirectory: Locator;
    private readonly buttonMenuMaintenance: Locator;
    private readonly buttonMenuClaim: Locator;
    private readonly buttonMenuBuzz: Locator;

    constructor(private readonly page: Page){
        this.pageTitleDashboard = page.getByRole('heading', { name: 'Dashboard' });

        this.buttonMenuAdmin = page.getByRole('link', { name: 'Admin' });
        this.buttonMenuPIM = page.getByRole('link', { name: 'PIM' });
        this.buttonMenuLeave = page.getByRole('link', { name: 'Leave' });
        this.buttonMenuTime = page.getByRole('link', { name: 'Time' });
        this.buttonMenuMyInfo = page.getByRole('link', { name: 'My Info' });
        this.buttonMenuRecruiment = page.getByRole('link', { name: 'Recruitment' });
        this.buttonMenuPerformance = page.getByRole('link', { name: 'Performance' });
        this.buttonMenuDashboard = page.getByRole('link', { name: 'Dashboard' });
        this.buttonMenuDirectory = page.getByRole('link', { name: 'Directory' });
        this.buttonMenuMaintenance = page.getByRole('link', { name: 'Maintenance' });
        this.buttonMenuClaim = page.getByRole('link', { name: 'Claim' });
        this.buttonMenuBuzz = page.getByRole('link', { name: 'Buzz' });
    }

    async validateDashboard(){

        console.log('URL atual:', this.page.url());

  await expect(this.page).toHaveURL(/dashboard/);
        await expect(this.pageTitleDashboard).toBeVisible();
    }
    async selectOptionMenuBuzz() {
        await this.buttonMenuBuzz.click();
    }


}