import { type Locale } from '@zag-js/i18n-utils'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'

export interface LocaleContext extends Locale {}

export const [LocaleContextProvider, useLocaleContext] = createContext<Accessor<LocaleContext>>({
  hookName: 'useEnvironmentContext',
  providerName: '<EnvironmentProvider />',
  strict: false,
  defaultValue: () => ({ dir: 'ltr', locale: 'en-US' }),
})
