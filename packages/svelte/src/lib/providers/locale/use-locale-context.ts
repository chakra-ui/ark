import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { Locale } from '@zag-js/i18n-utils'

export interface UseLocaleContext extends Accessor<Locale> {}

export const [LocaleContextProvider, useLocaleContext] = createContext<UseLocaleContext>({
  name: 'LocaleContext',
  strict: false,
  defaultValue: () => ({
    dir: 'ltr',
    locale: 'en-US',
  }),
})
