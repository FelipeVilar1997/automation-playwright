import { expect, type Locator, type Page } from '@playwright/test';

export class BuzzPage {
    private readonly pageTitleBuzz: Locator;
    private readonly pageSubtitleBuzzNews: Locator;

    private readonly txtSuccessMessagePosted: Locator;
    private readonly txtModalSharePhotos: Locator;

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
    }
    async clickPost(){
        await this.buttonNewPost.click();
    }

    async openModalSharePhoto(){
        await this.buttonSharePhotos.click()
        await expect(this.txtModalSharePhotos).toBeVisible({
            timeout: 10000,
    });
       await expect(this.buttonConfirmShare).toBeDisabled();
    }

    async insertFileInPost(filePath: string, message: string): Promise<void>{
        await this.photoPostInput.fill(message);
        await this.photoInput.setInputFiles(filePath);
        await expect(this.buttonConfirmShare).toBeEnabled();
        await this.buttonConfirmShare.click();
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
}