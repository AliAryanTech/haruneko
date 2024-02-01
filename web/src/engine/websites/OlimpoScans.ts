import { Tags } from '../Tags';
import icon from './OlimpoScans.webp';
import { type Chapter, DecoratableMangaScraper, Page } from '../providers/MangaPlugin';
import * as Common from './decorators/Common';
import * as FlatManga from './decorators/FlatManga';

@Common.MangaCSS(/^{origin}\/[^/]+\.html$/, FlatManga.queryMangaTitle, FlatManga.MangaLabelExtractor)
@Common.MangasMultiPageCSS(FlatManga.pathMultiPageManga, FlatManga.queryMangas, 1, 1, 0, FlatManga.MangaExtractor)
@FlatManga.ChaptersSinglePageCSS()
@Common.ImageAjax()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('olimposcans', `OlimpoScans`, 'https://olimposcans.com', Tags.Media.Manga, Tags.Media.Manhua, Tags.Media.Manhwa, Tags.Language.Spanish, Tags.Source.Scanlator);
    }

    public override get Icon() {
        return icon;
    }

    public override async FetchPages(chapter: Chapter): Promise<Page[]> {
        const pages = await FlatManga.FetchPagesSinglePageCSS.call(this, chapter);
        return pages.map(page => new Page(this, chapter, this.stripSearch(page.Link)));
    }

    stripSearch(Link: URL): URL {
        Link.pathname = Link.pathname.replace(/&.*/g, '');
        return Link;

    }
}
