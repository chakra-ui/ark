import { formatNumber } from '@zag-js/i18n-utils'
import { createMemo } from 'solid-js'
import { useLocaleContext } from '../../providers'

export interface FormatNumberProps extends Intl.NumberFormatOptions {
  /**
   * The number to format
   */
  value: number
}

export const FormatNumber = (props: FormatNumberProps) => {
  const ctx = useLocaleContext()
  const text = createMemo(() => {
    const { value, ...intlOptions } = props
    return formatNumber(value, ctx().locale, intlOptions)
  })

  return <>{text()}</>
}
