import { formatBytes } from '@zag-js/file-utils'
import { useLocaleContext } from '../locale'

export interface ByteFormatProps {
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

export const ByteFormat = (props: ByteFormatProps) => {
  const { value, ...intlOptions } = props
  const { locale } = useLocaleContext()
  return <>{formatBytes(value, locale, intlOptions)}</>
}

ByteFormat.displayName = 'ByteFormat'
