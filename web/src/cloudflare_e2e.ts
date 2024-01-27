import type { Browser, Page } from 'puppeteer-core';
import { describe, it, expect } from 'vitest';

export class TestFixture {

    private readonly browser: Browser;
    private page: Page;

    constructor() {
        this.browser = global.BROWSER;
    }

    public async SetupLocation(url: string): Promise<TestFixture> {
        this.page = this.page || await this.browser.newPage();
        await this.page.goto(url);
        return this;
    }

    public async Cleanup(): Promise<void> {
        return this.page?.close();
    }

    public async GetRemoteProperty<T>(query: string, property: string): Promise<T> {
        const element = await this.page.$(query);
        const attribute = await element?.getProperty(property);
        const value = await attribute?.jsonValue();
        return value as unknown as T;
    }
}

describe('CloudFlare Bypass', () => {

    it('Should bypass JavaScript Challenge', async () => {

        const fixture = await new TestFixture().SetupLocation('https://test.cloudscraper.ovh/challenge');

        try {
            const challenge = await fixture.GetRemoteProperty('form#challenge-form', 'action');
            expect(challenge).toContain('challenge?__cf_chl_f_tk');

            const start = Date.now();
            while(Date.now() - start < 10_000) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const hash = await fixture.GetRemoteProperty<string>('#hash', 'textContent');
                if(hash === '801BE7B2C3621A7DE738CF77BD4EF264') {
                    return;
                }
            }
            throw new Error('Bypassing CloudFlare failed within the given timeout!');
        } finally {
            fixture.Cleanup();
        }
    }, { timeout: 20_000 });
});