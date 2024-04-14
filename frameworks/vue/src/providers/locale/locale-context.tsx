import type { Locale } from '@zag-js/i18n-utils'
import { type ComputedRef, computed } from 'vue'
import { createContext } from '../../utils/context'

export interface LocaleContext extends Locale {}

export const LOCALE_DEFAULT: ComputedRef<LocaleContext> = computed(() => ({
  dir: 'ltr',
  locale: 'en-US',
}))

export const [LocaleContextProvider, useLocaleContext] =
  createContext<ComputedRef<LocaleContext>>('LocaleContext')
