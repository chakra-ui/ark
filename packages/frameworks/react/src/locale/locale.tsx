import { isRTL, trackLocale, type Locale, type LocaleOptions } from '@zag-js/i18n-utils'
import { useEffect, useState, type ReactNode } from 'react'
import { useEnvironmentContext } from '../environment'
import { LocaleContextProvider } from './locale-context'

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
