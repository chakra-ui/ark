import { formatRelativeTime } from '@zag-js/i18n-utils'
import { createMemo } from 'solid-js'
import { useLocaleContext } from '../../providers/locale'

export interface FormatRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
  /**
   * The date to format
   */
  value: Date
}

export const FormatRelativeTime = (props: FormatRelativeTimeProps) => {
  const ctx = useLocaleContext()
  const text = createMemo(() => {
    const { value, ...intlOptions } = props
    return formatRelativeTime(value, ctx().locale, intlOptions)
  })
  return <>{text()}</>
}
