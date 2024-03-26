import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemContext } from './use-segment-group-item-context'

export interface SegmentGroupItemControlProps extends HTMLArkProps<'div'> {}

export const SegmentGroupItemControl = forwardRef<HTMLDivElement, SegmentGroupItemControlProps>(
  (props, ref) => {
    const context = useSegmentGroupContext()
    const itemContext = useSegmentGroupItemContext()
    const mergedProps = mergeProps(
      context.getItemControlProps(itemContext),
      segmentGroupAnatomy.build().itemControl.attrs as Record<string, string>,
      props,
    )

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...context.getItemHiddenInputProps(itemContext)} />
      </>
    )
  },
)

SegmentGroupItemControl.displayName = 'SegmentGroupItemControl'
