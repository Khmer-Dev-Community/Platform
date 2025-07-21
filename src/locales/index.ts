import { createI18n } from 'vue-i18n'
import { Storage } from '@capacitor/storage'

import kmLocale from 'element-plus/es/locale/lang/km'
import enLocale from 'element-plus/es/locale/lang/en'

import type { BaseMessageModule, CombinedMessageSchema } from './messages'

type LocaleKeys = 'en' | 'km'

const element: Record<LocaleKeys, { el: Record<string, any> }> = {
  en: enLocale,
  km: kmLocale,
}

const itemize: Record<LocaleKeys, BaseMessageModule[]> = {
  en: [],
  km: [],
}

const modules = import.meta.glob<BaseMessageModule>('./lang/*.ts', {
  eager: true,
  import: 'default',
})

for (const path in modules) {
  const match = path.match(/\/([a-z-]+)\.ts$/i)
  if (match?.[1]) {
    const locale = match[1] as LocaleKeys
    if (!itemize[locale]) {
      itemize[locale] = []
    }
    itemize[locale].push(modules[path])
  } else {
    console.warn(`Unable to extract locale from path: ${path}`)
  }
}

function mergeMessages(modules: BaseMessageModule[]): BaseMessageModule {
  return modules.reduce((acc, cur) => Object.assign(acc, cur), {} as BaseMessageModule)
}

const messages: Record<LocaleKeys, CombinedMessageSchema> = {
  en: {
    ...mergeMessages(itemize.en),
    el: element.en.el,
  },
  km: {
    ...mergeMessages(itemize.km),
    el: element.km.el,
  },
}

export const i18n = createI18n({
  legacy: false, // Use Composition API
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  missingWarn: false,
  fallbackWarn: false,
})

export const setLocale = async (locale: LocaleKeys) => {
  await Storage.set({ key: 'lang', value: locale })
  i18n.global.locale.value = locale // Update locale reactively
}

export const getInitialLocale = async (): Promise<LocaleKeys> => {
  try {
    const { value } = await Storage.get({ key: 'lang' })
    if (value === 'en' || value === 'km') {
      return value
    }
  } catch (err) {
    console.error('Error reading language from storage:', err)
  }
  return 'en'
}

export const setupI18n = async () => {
  const locale = await getInitialLocale()
  console.log(locale)
  i18n.global.locale.value = locale
  return i18n
}

export const i18nGlobal = i18n.global
