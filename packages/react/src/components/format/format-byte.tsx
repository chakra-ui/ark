import { formatBytes } from '@zag-js/i18n-utils'
import { useMemo } from 'react'
import { useLocaleContext } from '../../providers/locale'

export interface FormatByteProps {
  /**
   * The unit granularity to display
   */
  unit?: 'bit' | 'byte' | undefined
  /**
   * The unit display
   */
  unitDisplay?: 'long' | 'short' | 'narrow' | undefined
  /**
   * The byte size to format
   */
  value: number
}

export const FormatByte = (props: FormatByteProps) => {
  const { locale } = useLocaleContext()

  const text = useMemo(() => {
    const { value, ...intlOptions } = props
    return formatBytes(value, locale, intlOptions)
  }, [props, locale])

  return <>{text}</>
}

FormatByte.displayName = 'FormatByte'
