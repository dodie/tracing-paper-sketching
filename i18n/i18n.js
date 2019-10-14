import * as Localization from "expo-localization";
import i18n from "i18n-js";
import en from "./translations/en.json";
import pl from "./translations/pl.json";
import pt_BR from "./translations/pt_BR.json";
import th from "./translations/th.json";
import ru from "./translations/ru.json";
import sr from "./translations/sr.json";
import ja from "./translations/ja.json";
import de from "./translations/de.json";
import nl from "./translations/nl.json";
import sk from "./translations/sk.json";
import es from "./translations/es.json";
import it from "./translations/it.json";
import hu from "./translations/hu.json";
import fr from "./translations/fr.json";
import cz from "./translations/cz.json";
import ar from "./translations/ar.json";
import bn from "./translations/bn.json";
import hi from "./translations/hi.json";
import id from "./translations/id.json";
import zh from "./translations/zh.json";
import zh_CN from "./translations/zh_CN.json";
import zh_TW from "./translations/zh_TW.json";

i18n.fallbacks = true;
i18n.translations = {
  en: en,
  pl: pl,
  ru: ru,
  th: th,
  pt_BR: pt_BR,
  sr: sr,
  ja: ja,
  de: de,
  nl: nl,
  sk: sk,
  es: es,
  it: it,
  hu: hu,
  fr: fr,
  cz: cz,
  ar: ar,
  bn: bn,
  hi: hi,
  id: id,
  zh: zh,
  "zh_Hans-CN": zh_CN,
  "zh-Hant-TW": zh_TW
};
i18n.locale = Localization.locale;
i18n.defaultLocale = "en-EN";

export default i18n;
