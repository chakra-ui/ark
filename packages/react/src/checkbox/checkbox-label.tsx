import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxLabelProps = HTMLAtlasProps<'label'>

export const CheckboxLabel = forwardRef<'label', CheckboxLabelProps>((props, ref) => {
  const { labelProps } = useCheckboxContext()
  const mergedProps = mergeProps(labelProps, props)

  return <atlas.label {...mergedProps} ref={ref} />
})
