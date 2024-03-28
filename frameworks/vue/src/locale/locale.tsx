import { isRTL, trackLocale, type Locale, type LocaleOptions } from '@zag-js/i18n-utils'
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useEnvironmentContext } from '../environment'
import { LocaleContextProvider } from './locale-context'

export interface LocaleProviderProps extends LocaleOptions {
  /**
   * The default locale to use if no locale is provided via props.
   */
  defaultLocale?: string
}

export const LocaleProvider = defineComponent<LocaleProviderProps>(
  (props, { slots }) => {
    const localeRef = ref(props.locale || props.defaultLocale || 'en-US')

    const getRootNode = useEnvironmentContext()

    onMounted(() => {
      const cleanup = trackLocale({
        locale: props.locale,
        getRootNode,
        onLocaleChange(locale) {
          localeRef.value = locale.locale
        },
      })

      onUnmounted(cleanup)
    })

    const context = computed(
      (): Locale => ({
        locale: localeRef.value,
        dir: isRTL(localeRef.value) ? 'rtl' : 'ltr',
      }),
    )

    LocaleContextProvider(context)

    return () => slots.default?.()
  },
  {
    name: 'LocaleProvider',
    props: ['locale', 'defaultLocale'],
  },
)
