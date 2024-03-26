import { type Locale } from '@zag-js/i18n-utils'
import { computed, type ComputedRef } from 'vue'
import { createContext } from '../context'

export interface LocaleContext extends Locale {}

export const LOCALE_DEFAULT: ComputedRef<LocaleContext> = computed(() => ({
  dir: 'ltr',
  locale: 'en-US',
}))

export const [LocaleContextProvider, useLocaleContext] =
  createContext<ComputedRef<LocaleContext>>('LocaleContext')
