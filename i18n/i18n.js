import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './translations/en.json';
import pl from './translations/pl.json';

i18n.fallbacks = true;
i18n.translations = { en, pl };
i18n.locale = Localization.locale;
i18n.defaultLocale = 'en-EN';

console.log(Localization.locale);
console.log(i18n.currentLocale());

export default i18n;