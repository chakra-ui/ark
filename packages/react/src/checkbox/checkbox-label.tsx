import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxLabelProps = HTMLAtlasProps<'span'>

export const CheckboxLabel = forwardRef<'span'>((props, ref) => {
  const { labelProps } = useCheckboxContext()
  return <atlas.input {...labelProps} {...props} ref={ref} />
})
