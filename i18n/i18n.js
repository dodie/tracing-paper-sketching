import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './translations/en.json';
import pl from './translations/pl.json';
import pt_BR from './translations/pt_BR.json';
import th from './translations/th.json';
import ru from './translations/ru.json';
import sr from "./translations/sr.json";

i18n.fallbacks = true;
i18n.translations = { en, pl, ru, th, pt_BR, sr };
i18n.locale = Localization.locale;
i18n.defaultLocale = "en-EN";

export default i18n;
