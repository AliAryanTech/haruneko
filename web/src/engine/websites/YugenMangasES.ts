import { Tags } from '../Tags';
import icon from './YugenMangasES.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as HeamCMS from './decorators/HeanCMS';

const apiUrl = 'https://api.yugenmangas.net';

@HeamCMS.MangaCSS(/^{origin}\/series\/[^/]+$/, apiUrl)
@HeamCMS.MangasMultiPageAJAX(apiUrl)
@HeamCMS.ChaptersSinglePageAJAX(apiUrl)
@HeamCMS.PagesSinglePageAJAX(apiUrl)
@HeamCMS.ImageAjax(true)
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('yugenmangas-es', 'YugenMangas (ES)', 'https://yugenmangas.lat', Tags.Media.Manga, Tags.Media.Manhwa, Tags.Media.Manhua, Tags.Media.Novel, Tags.Language.Spanish, Tags.Source.Aggregator);
    }

    public override get Icon() {
        return icon;
    }
}