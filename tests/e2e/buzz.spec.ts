import path from 'node:path';
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

    // test('CT01 - create new post text-only sucessfully', async ({
    //     buzzPage,
    //     logger,
    // }) => {
    //     const message = `Automated post only-text - ${Date.now()}`;

    //     await test.step('Create a new post', async () => {
    //         logger.info(`Creating new post: ${message}`);
    //         await buzzPage.writeNewPost(message);
    //         await buzzPage.clickPost();
    //         await buzzPage.validateMessageSuccessPost();
    //         logger.success(`Post created with success`)
    //     });

    //     await test.step('Validate success post created', async () => {
    //         logger.info(`Validating success post created`);
    //         await buzzPage.validatePostCreated(message);
    //         logger.success(`Message posted with success`);
    //     });
    // });

    // test('CT02 - Create new post with an image', async ({
    //     buzzPage,
    //     logger,
    // }) => {
    //     const postId = Date.now().toString();
    //     const message = `Automated post with image - ${postId}`;
    //     const imagePath = path.resolve(
    //         'test-data',
    //         'files',
    //         'test-valid.jpeg'
    //     )

    //     await test.step('Write a new post', async () => {
    //         logger.info(`Writing new post: ${message} and attaching file`);
    //         await buzzPage.openModalSharePhoto();
    //         const createdPostId = await buzzPage.insertFileInPost(imagePath, message);
    //         logger.success(`Post created and photo attach with success`)
    //     });

    //     await test.step('Reload Buzz Feed', async () => {
    //         await buzzPage.reloadBuzzFeed(postId);
    //     })

    //     await test.step('Validate success post created', async () => {
    //         logger.info(`Validating success post created`);

    //     await buzzPage.validatePostCreatedWithImage(postId);
    //         logger.success(`Message posted with success`);
    //     });
    // });

    test('CT03 - Create new post with invalid file', async ({
        buzzPage,
        logger,
    }) => {
        const invalidFile = path.resolve(
            'test-data',
            'files',
            'test-invalid-file.pdf'
        )
        await test.step('Attaching invalid file', async () => {
            logger.info(`Writing new post and attaching invalid file`);
            await buzzPage.openModalSharePhoto();
        
            const createdPostId = await buzzPage.insertFileInPost(invalidFile, '');
            logger.success(`Post created and photo attach with success`)
        });
    });
});
