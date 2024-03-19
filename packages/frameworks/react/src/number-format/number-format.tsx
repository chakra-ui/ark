import { formatNumber } from '@zag-js/i18n-utils'
import { useLocaleContext } from '../locale'

export interface NumberFormatProps extends Intl.NumberFormatOptions {
  /**
   * The number to format
   */
  value: number
}

export const NumberFormat = (props: NumberFormatProps) => {
  const { value, ...intlOptions } = props
  const { locale } = useLocaleContext()
  return <>{formatNumber(value, locale, intlOptions)}</>
}

NumberFormat.displayName = 'NumberFormat'
