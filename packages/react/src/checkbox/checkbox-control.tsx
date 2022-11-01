import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxControlProps = HTMLAtlasProps<'div'>

export const CheckboxControl = forwardRef<'div', CheckboxControlProps>((props, ref) => {
  const { controlProps } = useCheckboxContext()
  return <atlas.div {...controlProps} {...props} ref={ref} />
})
