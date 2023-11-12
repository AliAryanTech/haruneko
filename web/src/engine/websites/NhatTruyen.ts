import { Tags } from '../Tags';
import icon from './NhatTruyen.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Common from './decorators/Common';
import * as Mojo from './decorators/MojoPortalComic';
import { Text } from '../SettingsManager';
import { WebsiteResourceKey as R } from '../../i18n/ILocale';

@Common.MangaCSS(/^{origin}\/truyen-tranh\/[^/]+/, Mojo.queryMangaTitle)
@Common.MangasMultiPageCSS(Mojo.path, Mojo.queryMangas)
@Common.ChaptersSinglePageCSS(Mojo.queryChapter)
@Mojo.PagesSinglePageCSS([/638143969460448990.jpg$/], Mojo.queryPages)
@Common.ImageAjax()

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('nhattruyen', `NhatTruyen`, 'https://nhattruyenplus.com', Tags.Language.Vietnamese, Tags.Media.Manga, Tags.Media.Manhua, Tags.Media.Manhwa, Tags.Source.Aggregator);
        this.Settings.url = new Text('UrlOverride', R.Plugin_Settings_UrlOverride, R.Plugin_Settings_UrlOverrideInfo, 'https://nhattruyenplus.com');
        this.Settings.url.ValueChanged.Subscribe((_, value: string) => this.URI.href = value);
        this.URI.href = this.Settings.url.value as string;
    }

    public override get Icon() {
        return icon;
    }
}