﻿import { TestFixture, type Config } from '../../../test/WebsitesFixture';

const config: Config = {
    plugin: {
        id: 'comicvalkyrie',
        title: 'Comic Valkyrie'
    },
    container: {
        url: 'https://www.comic-valkyrie.com/teisou/',
        id: '/teisou/',
        title: '貞操逆転世界'
    },
    child: {
        id: '/samplebook/val_teisou01/',
        title: '第1話'
    },
    entry: {
        index: 0,
        size: 1_233_245,
        type: 'image/png'
    }
};

const fixture = new TestFixture(config);
describe(fixture.Name, () => fixture.AssertWebsite());