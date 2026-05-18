import { formatTime, type FormatTimeOptions } from '@zag-js/i18n-utils'
import { createMemo } from 'solid-js'
import { useLocaleContext } from '../../providers/index.tsx'

export interface FormatTimeProps extends FormatTimeOptions {
  /**
   * The time to format
   */
  value: string | Date
}

export const FormatTime = (props: FormatTimeProps) => {
  const ctx = useLocaleContext()
  const text = createMemo(() => {
    const { value, ...intlOptions } = props
    return formatTime(value, ctx().locale, intlOptions)
  })
  return <>{text()}</>
}
