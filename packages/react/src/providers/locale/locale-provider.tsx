import { isRTL } from '@zag-js/i18n-utils'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { LocaleContextProvider, type UseLocaleContext } from './use-locale-context'

export interface LocaleProviderProps extends PropsWithChildren {
  /**
   * The locale to use for the application.
   * @default 'en-US'
   */
  locale?: string
  /**
   * The list of supported locales. Use this to restrict locale switching.
   */
  supportedLocales?: string[]
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const { children, locale: initialLocale = 'en-US', supportedLocales } = props
  const [locale, setLocale] = useState(initialLocale)

  const context: UseLocaleContext = {
    locale,
    dir: isRTL(locale) ? 'rtl' : 'ltr',
    setLocale,
    supportedLocales,
  }

  return <LocaleContextProvider value={context}>{children}</LocaleContextProvider>
}
