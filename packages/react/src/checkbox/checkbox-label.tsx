import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxLabelProps = HTMLAtlasProps<'span'>

export const CheckboxLabel = forwardRef<'span', CheckboxLabelProps>((props, ref) => {
  const { labelProps } = useCheckboxContext()
  return <atlas.span {...labelProps} {...props} ref={ref} />
})
