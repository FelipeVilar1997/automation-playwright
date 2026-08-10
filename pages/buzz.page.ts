import { expect, type Locator, type Page } from '@playwright/test';

export class BuzzPage {
    private readonly pageTitleBuzz: Locator;
    private readonly pageSubtitleBuzzNews: Locator;

    private readonly txtSuccessMessagePosted: Locator;
    private readonly txtModalSharePhotos: Locator;
    private readonly txtInvalidFile: Locator;

    private readonly buttonMenuBuzz: Locator;
    private readonly buttonNewPost: Locator;
    private readonly buttonSharePhotos: Locator;
    private readonly buttonAddPhotos: Locator;
    private readonly buttonConfirmShare: Locator;

    private readonly postInput:Locator;
    private readonly photoPostInput:Locator;

    private readonly photoInput: Locator;

    constructor(private readonly page: Page){
        this.pageTitleBuzz = page.getByRole('heading', { name: 'Buzz' });
        this.pageSubtitleBuzzNews = page.getByText('Buzz Newsfeed', { exact: true });

        this.txtSuccessMessagePosted = page.getByText('Successfully Saved');
        this.txtModalSharePhotos = page.getByRole('dialog').getByText('Share Photos', { exact: true });
        this.txtInvalidFile = page.getByRole('dialog').getByText("Only 'gif', 'png', 'jpg', 'jpeg' type images are allowed!");

        this.buttonMenuBuzz = page.getByRole('link', { name: 'Buzz' });
        this.buttonNewPost = page.getByRole('button', { name: 'Post', exact: true });
        this.buttonSharePhotos = page.getByRole('button', { name: 'Share Photos', exact: true});
        this.buttonAddPhotos = page.getByText('Add Photos', { exact: true, });
        this.buttonConfirmShare = page.getByRole('dialog').getByRole('button', { name: 'Share', exact: true});

        this.postInput = page.getByPlaceholder("What's on your mind?");
        this.photoPostInput = page.getByRole('dialog').getByPlaceholder("What's on your mind?");

        this.photoInput = page.locator('.orangehrm-photo-input').locator('input[type="file"]');
    }

    async writeNewPost(message: string): Promise<void> {
        await this.postInput.fill(message);
        await this.buttonNewPost.click();
    }

    async openModalSharePhoto(){
        await this.buttonSharePhotos.click()
        await expect(this.txtModalSharePhotos).toBeVisible({
            timeout: 10000,
    });
       await expect(this.buttonConfirmShare).toBeDisabled();
    }

    async selectFile(filePath: string): Promise<void> {
        await this.photoInput.setInputFiles(filePath);
    }

    async insertFileInPost(filePath: string, message: string): Promise<void>{
        await this.selectFile(filePath);

        await expect(this.buttonConfirmShare).toBeEnabled();
        
        await this.photoPostInput.fill(message);

        const responsePostCreated = this.page.waitForResponse(response =>
            response.url().includes('/api/v2/buzz/posts') &&
            response.request().method() === 'POST'
        );

        await this.buttonConfirmShare.click();
    
        const response = await responsePostCreated;

        expect(response.status()).toBe(200);
    }

    async reloadBuzzFeed(): Promise<void> {
        const feedResponsePromise = this.page.waitForResponse(response => 
            response.url().includes('/api/v2/buzz/feed') &&
            response.request().method() === 'GET' &&
            response.status() === 200
    );

        await this.page.reload();

        const response = await feedResponsePromise;

        await response.finished();
    }

    async validateInvalidFile(){
        await expect(this.buttonConfirmShare).toBeDisabled();
        await expect(this.txtInvalidFile).toBeVisible();
        await expect(this.buttonConfirmShare).toBeDisabled();
    }

    async validateMessageSuccessPost() {
        await expect(this.txtSuccessMessagePosted).toBeVisible();
    }
    async validatePostCreated(message: string): Promise<void> {
        const newPost = this.page.getByText(message, {
            exact: true,
        });
        await expect(newPost).toBeVisible({
            timeout: 10000,
        });
    }
    async validatePostCreatedWithImage(message: string): Promise<void>{
        const postText = this.page
            .locator('.orangehrm-buzz-post-body-text')
            .filter({ hasText: message });

        await expect(postText).toBeVisible({
            timeout: 20000,
        });
        const postBody = postText.locator('..');

        await expect(postBody.locator('.orangehrm-buzz-photos img')).toBeVisible();
    }
}