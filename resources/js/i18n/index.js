import { createI18n } from 'vue-i18n'
import en from '../locales/en.js'
import km from '../locales/km.js'

// Get user's preferred language from localStorage or browser
const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) return savedLocale
  
  const browserLocale = navigator.language || navigator.userLanguage
  if (browserLocale.startsWith('km')) return 'km'
  
  return 'en'
}

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    km
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    km: {
      currency: {
        style: 'currency',
        currency: 'KHR'
      }
    }
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    },
    km: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    }
  }
})

export default i18n