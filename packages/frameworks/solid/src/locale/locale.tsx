import { isRTL, trackLocale, type Locale, type LocaleOptions } from '@zag-js/i18n-utils'
import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  splitProps,
  type ParentProps,
} from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { LocaleContextProvider } from './locale-context'

export interface LocaleProviderProps extends LocaleOptions, ParentProps {
  /**
   * The default locale to use if no locale is provided via props.
   */
  defaultLocale?: string
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const [localeProps, restProps] = splitProps(props, ['locale', 'defaultLocale'])

  const [locale, setLocale] = createSignal(
    localeProps.defaultLocale || localeProps.locale || 'en-US',
  )

  const getRootNode = useEnvironmentContext()

  createEffect(() => {
    const cleanup = trackLocale({
      locale: localeProps.locale,
      getRootNode,
      onLocaleChange(locale) {
        setLocale(locale.locale)
      },
    })

    onCleanup(cleanup)
  })

  const context = createMemo(
    (): Locale => ({
      locale: locale(),
      dir: isRTL(locale()) ? 'rtl' : 'ltr',
    }),
  )

  return <LocaleContextProvider value={context}>{restProps.children}</LocaleContextProvider>
}
