import { test } from '../../fixtures/app.fixture';

test.describe('Buzz Screen', () => {
    test.beforeEach(async ({
        page,
        dashboardPage,
        buzzPage,
        logger
    }) => {
        await test.step('Access Buzz page', async () => {
        logger.info('Accessing Buzz Page');

        await page.goto('/web/index.php/dashboard/index');

        await dashboardPage.validateDashboard();
        await dashboardPage.selectOptionMenuBuzz();

        logger.success('Buzz page loaded sucessfully');
        });
    });



    test('should create a new post sucessfully', async ({
        buzzPage,
        logger,
    }) => {
        const message = `Automated post - ${Date.now()}`;

        await test.step('Create a new post', async () => {
            logger.info(`Creating new post: ${message}`);
            await buzzPage.createNewPost(message);
            await buzzPage.validateMessageSucessPost();
            logger.success(`Post created with success`)
        });

        await test.step('Validate success post created', async () => {
            logger.info(`Validating success post created`);
            await buzzPage.validatePostCreated(message);
            logger.success(`Message posted with success`);
        });
    });
});
