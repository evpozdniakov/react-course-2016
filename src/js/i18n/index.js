import en from './en.json'
import ru from './ru.json'

const langs = {en ,ru}

var currentLang
var currentDictionary = dictionary()

export function setLang(lang) {
  currentLang = lang
  currentDictionary = dictionary(lang)
}

export function i18n(label) {
  if (!currentLang) {
    // console.warn('i18n currentLang not specified')
  }

  return currentDictionary[label] || `[${label}]`
}

function dictionary(lang) {
  return langs[lang] || langs.en
}
