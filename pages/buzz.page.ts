import { expect, type Locator, type Page } from '@playwright/test';

export class BuzzPage {
    private readonly pageTitleBuzz: Locator;
    private readonly pageSubtitleBuzzNews: Locator;

    private readonly txtSuccessMessagePosted: Locator;

    private readonly buttonMenuBuzz: Locator;
    private readonly buttonNewPost: Locator;

    private readonly postInput:Locator;

    constructor(private readonly page: Page){
        this.pageTitleBuzz = page.getByRole('heading', { name: 'Buzz' });
        this.pageSubtitleBuzzNews = page.getByText('Buzz Newsfeed', { exact: true });

        this.txtSuccessMessagePosted = page.getByText('Successfully Saved');

        this.buttonMenuBuzz = page.getByRole('link', { name: 'Buzz' });
        this.buttonNewPost = page.getByRole('button', { name: 'Post', exact: true });

        this.postInput = page.getByPlaceholder("What's on your mind?");
    }

    async createNewPost(message: string): Promise<void> {
        await this.postInput.fill(message);
        await this.buttonNewPost.click();
    }

    async validateMessageSucessPost() {
        await expect(this.txtSuccessMessagePosted).toBeVisible();
    }

    async validatePostCreated(message: string): Promise<void> {
        const newPost = this.page.locator('p.orangehrm-buzz-post-body-text')
        .filter({ hasText: message });
        console.log(newPost);
        await expect(newPost).toBeVisible();
    }
}