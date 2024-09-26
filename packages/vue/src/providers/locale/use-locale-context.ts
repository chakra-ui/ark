import type { Locale } from '@zag-js/i18n-utils'
import { type ComputedRef, computed, useId } from 'vue'
import { createContext } from '../../utils'

export interface LocaleContext extends Locale {}

export const DEFAULT_LOCALE: ComputedRef<LocaleContext> = computed(() => ({
  dir: 'ltr',
  locale: 'en-US',
}))

export const [LocaleContextProvider, useLocaleContext] =
  createContext<ComputedRef<LocaleContext>>('LocaleContext')
