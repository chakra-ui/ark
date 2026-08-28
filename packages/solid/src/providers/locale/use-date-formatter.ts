import { DateFormatter } from '@internationalized/date'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useLocaleContext } from './use-locale-context.ts'

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string
}

export interface UseDateFormatterReturn extends Accessor<DateFormatter> {}

export function useDateFormatter(props: MaybeAccessor<UseDateFormatterProps> = {}): UseDateFormatterReturn {
  const env = useLocaleContext()
  return createMemo(() => {
    const resolvedProps = runIfFn(props)
    const locale = resolvedProps.locale ?? env().locale
    const { locale: _, ...options } = resolvedProps
    return new DateFormatter(locale, options)
  })
}
