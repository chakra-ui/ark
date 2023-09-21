import { type Locale } from '@zag-js/i18n-utils'
import { createContext } from '../create-context'

export interface LocaleContext extends Locale {}

export const [LocaleContextProvider, useLocaleContext] = createContext<LocaleContext>({
  name: 'EnvironmentContext',
  hookName: 'useEnvironmentContext',
  providerName: '<EnvironmentProvider />',
  strict: false,
  defaultValue: { dir: 'ltr', locale: 'en-US' },
})
