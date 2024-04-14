import { formatNumber } from '@zag-js/i18n-utils'
import { createMemo, splitProps } from 'solid-js'
import { useLocaleContext } from '../../providers'

export interface FormatNumberProps extends Intl.NumberFormatOptions {
  /**
   * The number to format
   */
  value: number
}

export const FormatNumber = (props: FormatNumberProps) => {
  const [valueProps, intlProps] = splitProps(props, ['value'])
  const ctx = useLocaleContext()
  const text = createMemo(() => formatNumber(valueProps.value, ctx().locale, intlProps))

  return <>{text}</>
}
