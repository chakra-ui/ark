import { DateFormatter } from '@internationalized/date'
import { useMemo } from 'react'
import { useLocaleContext } from './use-locale-context'

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string
}

export function useDateFormatter(props: UseDateFormatterProps = {}): DateFormatter {
  const env = useLocaleContext()
  const locale = props.locale ?? env.locale
  return useMemo(() => {
    const { locale: _, ...options } = props
    return new DateFormatter(locale, options)
  }, [locale, props])
}
