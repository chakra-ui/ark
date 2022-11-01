import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputFieldProps = HTMLAtlasProps<'input'>

export const NumberInputField = forwardRef<'input', NumberInputFieldProps>((props, ref) => {
  const { inputProps } = useNumberInputContext()
  return <atlas.input {...inputProps} {...props} ref={ref} />
})
