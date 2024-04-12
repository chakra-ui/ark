import { type Locale, type LocaleOptions, isRTL, trackLocale } from '@zag-js/i18n-utils'
import { type ReactNode, useEffect, useState } from 'react'
import { useEnvironmentContext } from '../environment'
import { LocaleContextProvider } from './use-locale-context'

export interface LocaleProviderProps extends LocaleOptions {
  /**
   * The default locale to use if no locale is provided via props.
   */
  defaultLocale?: string
  /**
   * The children to render.
   */
  children: ReactNode
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const { children, locale: localeProps, defaultLocale = 'en-US' } = props

  const [locale, setLocale] = useState(localeProps || defaultLocale)
  const getRootNode = useEnvironmentContext()

  useEffect(() =>
    trackLocale({
      locale: localeProps,
      getRootNode,
      onLocaleChange(locale) {
        setLocale(locale.locale)
      },
    }),
  )

  const context: Locale = {
    locale,
    dir: isRTL(locale) ? 'rtl' : 'ltr',
  }

  return <LocaleContextProvider value={context}>{children}</LocaleContextProvider>
}
