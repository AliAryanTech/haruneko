import type { ILocale, ResourceKeys } from './ILocale';
import { en_US } from './locales/en_US';
import { de_DE } from './locales/de_DE';

/**
 * List of all available localizations in the application.
 * See: https://saimana.com/list-of-country-locale-code/
 */
export const Locales: ILocale[] = [
    en_US,
    de_DE
];

/**
 * Convenience function for {@link _L}, which automatically determines the user configured language code.
 * This method may be used in places where the text is generated on the fly (e.g. getter properties, error messages),
 * or must not immediately reflect when the user canges the language code configuration.
 */
export function i18n(key: ResourceKeys | string, ...params: string[]): string {
    // TODO: Determine user selected langauge code from settings or frontend ... ?
    const code = 'en_US';
    return _L(code, key, ...params);
}

/**
 * Search the localized text for the given language code and resource key.
 * This method may be used in reactive statements depending on langauge code (e.g. frontend),
 * or in places where an explicit langauge code shall be used (e.g. error traces).
 */
export function _L(code: string, key: ResourceKeys | string, ...params: string[]): string {
    const resources = Locales.find(locale => locale.Code === code)?.Resources;
    let text: string = resources && resources[key] || `【 ${key} 】`;
    for(const index in params) {
        const regex = new RegExp(`\\{${index}\\}`, 'g');
        text = text.replace(regex, params[index]);
    }
    return text;
}