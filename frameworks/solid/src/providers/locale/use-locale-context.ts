import type { Locale } from '@zag-js/i18n-utils'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface UseLocaleContext extends Accessor<Locale> {}

export const [LocaleContextProvider, useLocaleContext] = createContext<UseLocaleContext>({
  hookName: 'useEnvironmentContext',
  providerName: '<EnvironmentProvider />',
  strict: false,
  defaultValue: () => ({ dir: 'ltr', locale: 'en-US' }),
})
