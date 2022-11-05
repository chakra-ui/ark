import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxInputProps = HTMLAtlasProps<'input'>

export const CheckboxInput = forwardRef<'input', CheckboxInputProps>((props, ref) => {
  const { inputProps } = useCheckboxContext()
  const mergedProps = mergeProps(inputProps, props)

  return <atlas.input {...mergedProps} ref={ref} />
})
