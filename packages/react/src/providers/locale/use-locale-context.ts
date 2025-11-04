import type { Locale } from '@zag-js/i18n-utils'
import { createContext } from '../../utils/create-context'

export interface UseLocaleContext extends Locale {
  setLocale: (locale: string) => void
  supportedLocales?: string[]
}

export const [LocaleContextProvider, useLocaleContext] = createContext<UseLocaleContext>({
  name: 'LocaleContext',
  hookName: 'useLocaleContext',
  providerName: '<LocaleProvider />',
  strict: false,
  defaultValue: { dir: 'ltr', locale: 'en-US', supportedLocales: [], setLocale: () => {} },
})
