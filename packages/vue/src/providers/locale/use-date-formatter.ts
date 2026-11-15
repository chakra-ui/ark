import { DateFormatter } from '@internationalized/date'
import { type ComputedRef, type MaybeRefOrGetter, computed, toValue } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from './use-locale-context.ts'

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string
}

export interface UseDateFormatterReturn extends ComputedRef<DateFormatter> {}

export function useDateFormatter(propsOrFn: MaybeRefOrGetter<UseDateFormatterProps> = {}): UseDateFormatterReturn {
  const env = useLocaleContext(DEFAULT_LOCALE)

  return computed(() => {
    const props = toValue(propsOrFn)
    const locale = props.locale ?? env.value.locale
    const { locale: _, ...options } = props
    return new DateFormatter(locale, options)
  })
}
