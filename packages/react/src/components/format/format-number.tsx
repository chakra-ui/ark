import { formatNumber } from '@zag-js/i18n-utils'
import { useMemo } from 'react'
import { useLocaleContext } from '../../providers/locale'

export interface FormatNumberProps extends Intl.NumberFormatOptions {
  /**
   * The number to format
   */
  value: number
}

export const FormatNumber = (props: FormatNumberProps) => {
  const { value, ...intlOptions } = props
  const { locale } = useLocaleContext()
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const text = useMemo(() => formatNumber(value, locale, intlOptions), [value, locale, intlOptions])
  return <>{text}</>
}

FormatNumber.displayName = 'FormatNumber'
