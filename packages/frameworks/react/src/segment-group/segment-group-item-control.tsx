import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'

export type SegmentGroupItemControlProps = HTMLArkProps<'div'>

export const SegmentGroupItemControl = forwardRef<HTMLDivElement, SegmentGroupItemControlProps>(
  (props, ref) => {
    const api = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemContext()
    const mergedProps = mergeProps(api.getItemControlProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SegmentGroupItemControl.displayName = 'SegmentGroupItemControl'
