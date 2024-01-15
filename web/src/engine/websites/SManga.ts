﻿import { Tags } from '../Tags';
import icon from './SManga.webp';
import { Chapter, DecoratableMangaScraper, type MangaPlugin, Manga } from '../providers/MangaPlugin';
import * as Common from './decorators/Common';
import * as SpeedBinb from './decorators/SpeedBinb';
import { FetchRequest, FetchWindowScript } from '../FetchProvider';

type SSD = {
    datas?: [{
        series_data: {
            series_name: string,
            series_id: number
        }
    }],
    data?: {
        item_datas?: [{
            ssid: number,
            isbn: string,
            item_name: string
        }]
    }
}

@Common.MangasNotSupported()
@SpeedBinb.PagesSinglePageAjax()
@SpeedBinb.ImageAjax()
export default class extends DecoratableMangaScraper {
    public constructor() {
        super('smanga', `S-Manga`, 'https://www.s-manga.net', Tags.Language.Japanese, Tags.Media.Manga, Tags.Source.Official);
    }

    public override get Icon() {
        return icon;
    }
    public override ValidateMangaURL(url: string): boolean {
        return /https:\/\/www\.s-manga\.net\/items\/contents.html\?isbn=/.test(url);
    }

    public override async FetchManga(provider: MangaPlugin, url: string): Promise<Manga> {
        const { datas } = await FetchWindowScript<SSD>(new FetchRequest(url), 'window.ssd', 2000);
        return new Manga(this, provider, datas[0].series_data.series_id.toString(), datas[0].series_data.series_name.trim());
    }

    public override async FetchChapters(manga: Manga): Promise<Chapter[]> {
        const url = new URL(`/search/search.html?seriesid=${manga.Identifier}&order=1`, this.URI);
        const { data } = await FetchWindowScript<SSD>(new FetchRequest(url.href), 'window.ssd', 2000);
        return data.item_datas.map(chapter => new Chapter(this, manga, `/reader/main.php?cid=${this.isbnToCid(chapter.isbn)}`, chapter.item_name.replace(manga.Title, '').trim().replace(/^／/, '').trim()));
    }

    isbnToCid(ISBN: string): string {
        return ISBN.replaceAll('-', '');
    }
}