import { TestFixture, type Config } from '../../../test/WebsitesFixture';

const config: Config = {
    plugin: {
        id: 'manhuascan',
        title: 'ManhuaScan'
    },
    container: {
        url: 'https://manhuascan.io/manga/35647-taoist-master-hoguk',
        id: '/manga/35647-taoist-master-hoguk',
        title: 'Taoist Master Hoguk'
    },
    child: {
        id: '/manga/35647-taoist-master-hoguk/chapter-67',
        title: 'Chapter 67',
        timeout : 10000
    },
    entry: {
        index: 0,
        size: 237_942,
        type: 'image/webp'
    }
};

const fixture = new TestFixture(config);
describe(fixture.Name, () => fixture.AssertWebsite());