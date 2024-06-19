import { type Locale, isRTL } from '@zag-js/i18n-utils'
import type { PropsWithChildren } from 'react'
import { LocaleContextProvider } from './use-locale-context'

export interface LocaleProviderProps extends PropsWithChildren {
  /**
   * The locale to use for the application.
   * @default 'en-US'
   */
  locale: string
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const { children, locale } = props

  const context: Locale = {
    locale,
    dir: isRTL(locale) ? 'rtl' : 'ltr',
  }

  return <LocaleContextProvider value={context}>{children}</LocaleContextProvider>
}
