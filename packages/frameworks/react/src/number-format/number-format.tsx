import { formatNumber } from '@zag-js/i18n-utils'
import { useMemo } from 'react'
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
  const text = useMemo(() => formatNumber(value, locale, intlOptions), [value, locale, intlOptions])
  return <>{text}</>
}

NumberFormat.displayName = 'NumberFormat'
