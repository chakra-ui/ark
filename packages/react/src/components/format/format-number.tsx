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
  const { locale } = useLocaleContext()

  const text = useMemo(() => {
    const { value, ...intlOptions } = props
    return formatNumber(value, locale, intlOptions)
  }, [props, locale])

  return <>{text}</>
}

FormatNumber.displayName = 'FormatNumber'
