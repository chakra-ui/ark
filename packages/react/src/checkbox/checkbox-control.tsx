import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxControlProps = HTMLAtlasProps<'div'>

export const CheckboxControl = forwardRef<'div', CheckboxControlProps>((props, ref) => {
  const { controlProps } = useCheckboxContext()
  const mergedProps = mergeProps(controlProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
