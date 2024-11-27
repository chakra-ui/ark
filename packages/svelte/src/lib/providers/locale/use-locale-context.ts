import { createContext } from '$lib/utils/create-context'
import type { Locale } from '@zag-js/i18n-utils'

export const DEFAULT_LOCALE: Locale = {
  dir: 'ltr',
  locale: 'en-US',
}

export interface UseLocaleContext extends Locale {}

export const [LocaleContextProvider, useLocaleContext] = createContext<UseLocaleContext>({
  key: 'LocaleContext',
})
