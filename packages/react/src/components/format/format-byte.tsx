import { formatBytes } from '@zag-js/i18n-utils'
import { useMemo } from 'react'
import { useLocaleContext } from '../../providers/locale'

export interface FormatByteProps {
  /**
   * The unit granularity to display
   */
  unit?: 'bit' | 'byte'
  /**
   * The unit display
   */
  unitDisplay?: 'long' | 'short' | 'narrow'
  /**
   * The byte size to format
   */
  value: number
}

export const FormatByte = (props: FormatByteProps) => {
  const { value, ...intlOptions } = props
  const { locale } = useLocaleContext()
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const text = useMemo(() => formatBytes(value, locale, intlOptions), [value, locale, intlOptions])
  return <>{text}</>
}

FormatByte.displayName = 'FormatByte'
