import { type Locale } from '@zag-js/i18n-utils'
import { createContext } from '../create-context'

export interface LocaleContext extends Locale {}

export const [LocaleContextProvider, useLocaleContext] = createContext<LocaleContext>({
  name: 'LocaleContext',
  hookName: 'useLocaleContext',
  providerName: '<LocaleProvider />',
  strict: false,
  defaultValue: { dir: 'ltr', locale: 'en-US' },
})
