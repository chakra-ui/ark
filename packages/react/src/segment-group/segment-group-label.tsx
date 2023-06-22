import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentGroupLabelProps = HTMLArkProps<'label'>

export const SegmentGroupLabel = forwardRef<'label'>((props, ref) => {
  const { labelProps } = useSegmentGroupContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} {...parts.label.attrs} ref={ref} />
})
