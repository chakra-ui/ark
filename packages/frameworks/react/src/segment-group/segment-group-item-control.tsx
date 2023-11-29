import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'

export interface SegmentGroupItemControlProps extends HTMLArkProps<'div'> {}

export const SegmentGroupItemControl = forwardRef<HTMLDivElement, SegmentGroupItemControlProps>(
  (props, ref) => {
    const api = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemContext()
    const mergedProps = mergeProps(
      api.getItemControlProps(itemProps),
      segmentGroupAnatomy.build().itemControl.attrs as Record<string, string>,
      props,
    )

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...api.getItemHiddenInputProps(itemProps)} />
      </>
    )
  },
)

SegmentGroupItemControl.displayName = 'SegmentGroupItemControl'
