import { formatNumber } from '@zag-js/i18n-utils'
import { createMemo, splitProps } from 'solid-js'
import { useLocaleContext } from '../locale'

export interface NumberFormatProps extends Intl.NumberFormatOptions {
  /**
   * The number to format
   */
  value: number
}

export const NumberFormat = (props: NumberFormatProps) => {
  const [valueProps, intlProps] = splitProps(props, ['value'])
  const ctx = useLocaleContext()
  const text = createMemo(() => formatNumber(valueProps.value, ctx().locale, intlProps))
  return <>{text}</>
}

NumberFormat.displayName = 'NumberFormat'
