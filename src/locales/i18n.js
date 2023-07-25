import { createI18n } from 'vue-i18n'
import en from './en.json'
import it from './it.json'

const i18n = createI18n({
  locale: "it",
  messages: {
    en, 
    it 
  }
})

export default i18n