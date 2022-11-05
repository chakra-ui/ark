import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputFieldProps = HTMLAtlasProps<'input'>

export const NumberInputField = forwardRef<'input', NumberInputFieldProps>((props, ref) => {
  const { inputProps } = useNumberInputContext()
  const mergedProps = mergeProps(inputProps, props)

  return <atlas.input {...mergedProps} ref={ref} />
})
