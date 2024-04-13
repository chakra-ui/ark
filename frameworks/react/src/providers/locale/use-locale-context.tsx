import type { Locale } from '@zag-js/i18n-utils'
import { createContext } from '~/utils/create-context'

export interface UseLocaleContext extends Locale {}

export const [LocaleContextProvider, useLocaleContext] = createContext<UseLocaleContext>({
  name: 'LocaleContext',
  hookName: 'useLocaleContext',
  providerName: '<LocaleProvider />',
  strict: false,
  defaultValue: { dir: 'ltr', locale: 'en-US' },
})
