import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupLabelProps = HTMLAtlasProps<'label'>

export const RadioGroupLabel = forwardRef<'label', RadioGroupLabelProps>((props, ref) => {
  const { labelProps } = useRadioGroupContext()
  const mergedProps = mergeProps(labelProps, props)

  return <atlas.label {...mergedProps} ref={ref} />
})
