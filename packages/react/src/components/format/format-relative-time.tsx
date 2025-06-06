import { formatRelativeTime } from '@zag-js/i18n-utils'
import { useMemo } from 'react'
import { useLocaleContext } from '../../providers/locale'

export interface FormatRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
  /**
   * The date to format
   */
  value: Date
}

export const FormatRelativeTime = (props: FormatRelativeTimeProps) => {
  const { locale } = useLocaleContext()
  const text = useMemo(() => {
    const { value, ...intlOptions } = props
    return formatRelativeTime(value, locale, intlOptions)
  }, [props, locale])
  return <>{text}</>
}

FormatRelativeTime.displayName = 'FormatRelativeTime'
