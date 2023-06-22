import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSegmentedGroupContext } from './segmented-group-context'

export type SegmentedGroupLabelProps = HTMLArkProps<'label'>

export const SegmentedGroupLabel = forwardRef<'label'>((props, ref) => {
  const { labelProps } = useSegmentedGroupContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
