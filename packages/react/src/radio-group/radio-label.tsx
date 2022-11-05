import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioLabelProps = HTMLAtlasProps<'span'>

export const RadioLabel = forwardRef<'span', RadioLabelProps>((props, ref) => {
  const { getItemLabelProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getItemLabelProps(context), props)

  return <atlas.span {...mergedProps} ref={ref} />
})
