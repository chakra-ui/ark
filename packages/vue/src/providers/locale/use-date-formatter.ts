import { DateFormatter } from '@internationalized/date'
import { type ComputedRef, type MaybeRef, computed, toValue } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from './use-locale-context'

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string
}

export interface UseDateFormatterReturn extends ComputedRef<DateFormatter> {}

export function useDateFormatter(propsOrFn: MaybeRef<UseDateFormatterProps> = {}): UseDateFormatterReturn {
  const env = useLocaleContext(DEFAULT_LOCALE)

  return computed(() => {
    const props = toValue(propsOrFn)
    const locale = props.locale ?? env.value.locale
    const { locale: _, ...options } = props
    return new DateFormatter(locale, options)
  })
}
