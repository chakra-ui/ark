import { type Locale, isRTL } from '@zag-js/i18n-utils'
import { type ParentProps, createMemo } from 'solid-js'
import { LocaleContextProvider } from './use-locale-context'

export interface LocaleProviderProps extends ParentProps {
  /**
   * The locale to use. For example, 'en-US'.
   */
  locale: string
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const context = createMemo(
    (): Locale => ({
      locale: props.locale,
      dir: isRTL(props.locale) ? 'rtl' : 'ltr',
    }),
  )

  return <LocaleContextProvider value={context}>{props.children}</LocaleContextProvider>
}
