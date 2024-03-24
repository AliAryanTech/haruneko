﻿import { TestFixture } from '../../../test/WebsitesFixture';

const config = {
    plugin: {
        id: 'magusmanga',
        title: 'MagusManga'
    },
    container: {
        url: 'https://vofeg.com/series/4741157281-absolute-threshold/',
        id: '/series/4741157281-absolute-threshold/',
        title: 'Absolute Threshold'
    },
    child: {
        id: '/7417149166-absolute-threshold-chapter-22/',
        title: 'Chapter 22'
    },
    entry: {
        index: 1,
        size: 718_960,
        type: 'image/jpeg'
    }
};

const fixture = new TestFixture(config);
describe(fixture.Name, () => fixture.AssertWebsite());