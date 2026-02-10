import { DateFormatter } from '@internationalized/date'
import { useLocaleContext } from './use-locale-context'
import type { Accessor } from '$lib/types'

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string
}

export interface UseDateFormatterReturn extends Accessor<DateFormatter> {}

export function useDateFormatter(props: UseDateFormatterProps = {}): UseDateFormatterReturn {
  const env = useLocaleContext()
  const locale = $derived(props.locale ?? env().locale)

  const formatter = $derived.by(() => {
    const { locale: _, ...options } = props
    return new DateFormatter(locale, options)
  })

  return () => formatter
}
