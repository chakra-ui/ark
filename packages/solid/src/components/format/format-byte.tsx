import { formatBytes } from '@zag-js/i18n-utils'
import { createMemo } from 'solid-js'
import { useLocaleContext } from '../../providers'

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
  const ctx = useLocaleContext()
  const text = createMemo(() => {
    const { value, ...intlOptions } = props
    return formatBytes(value, ctx().locale, intlOptions)
  })

  return <>{text()}</>
}
