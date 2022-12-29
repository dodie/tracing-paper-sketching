const fs = require('fs');
const { exit } = require('process');

function getTranslations() {
    const dir = '../i18n/translations';
    const fileNames = fs.readdirSync(dir);

    const translations = {};
    fileNames
        .forEach(fileName => {
            const lang = fileName.substring(0, fileName.indexOf("."));
            let translation = JSON.parse(fs.readFileSync(dir + "/" + fileName));
            translations[lang] = translation;
        });
    return translations;
}

function getAllKeys(translations) {
    keys = [];
    for (const lang in translations) {
        keys.push(...Object.keys(translations[lang]));
    }

    return new Set(keys);
}

function getMissing(translations, allKeys) {
    const en = translations['en'];

    const missingTranslations = {};

    for (const lang in translations) {
        const translation = translations[lang];
        const translationKeys = new Set(Object.keys(translation));
        
        allKeys.forEach(key => {
            if (!(translationKeys.has(key))) {
                if (missingTranslations[lang] === undefined) {
                    missingTranslations[lang] = {};
                }
                missingTranslations[lang][key] = en[key];
            }
        });
    }
    return missingTranslations;
}

const translations = getTranslations();
const missingTranslations = getMissing(translations, getAllKeys(translations));
console.log(JSON.stringify(missingTranslations, null, 2));

if (missingTranslations['en'] !== undefined) {
    console.log("Superfluous translations: " + Object.keys(missingTranslations['en']));
}



