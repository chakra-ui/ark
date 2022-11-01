import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxControlProps = HTMLAtlasProps<'div'>

export const CheckboxControl = forwardRef<'div'>((props, ref) => {
  const { controlProps } = useCheckboxContext()
  return <atlas.input {...controlProps} {...props} ref={ref} />
})
