import { formatBytes } from '@zag-js/file-utils'
import { createMemo, splitProps } from 'solid-js'
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
  const [valueProps, intlProps] = splitProps(props, ['value'])
  const ctx = useLocaleContext()
  const text = createMemo(() => formatBytes(valueProps.value, ctx().locale, intlProps))
  return <>{text}</>
}

ByteFormat.displayName = 'ByteFormat'
