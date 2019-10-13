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

i18n.fallbacks = true;
i18n.translations = {
  en,
  pl,
  ru,
  th,
  pt_BR,
  sr,
  ja,
  de,
  nl,
  sk,
  es,
  it,
  hu,
  fr,
  cz,
  ar,
  bn,
  hi,
  id,
  zh
};
i18n.locale = Localization.locale;
i18n.defaultLocale = "en-EN";

export default i18n;
