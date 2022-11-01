import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxInputProps = HTMLAtlasProps<'input'>

export const CheckboxInput = forwardRef<'input'>((props, ref) => {
  const { inputProps } = useCheckboxContext()
  return <atlas.input {...inputProps} {...props} ref={ref} />
})
