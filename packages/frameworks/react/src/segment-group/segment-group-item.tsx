import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useSegmentGroupContext } from './segment-group-context'
import {
  SegmentGroupItemProvider,
  type ItemState,
  type SegmentGroupItemContext,
} from './segment-group-item-context'
import { parts } from './segment-group.anatomy'

export interface SegmentGroupItemProps
  extends Assign<
      HTMLArkProps<'label'>,
      { children?: React.ReactNode | ((props: ItemState) => React.ReactNode) }
    >,
    SegmentGroupItemContext {}

export const SegmentGroupItem = forwardRef<HTMLLabelElement, SegmentGroupItemProps>(
  (props, ref) => {
    const [itemProps, { children, ...localProps }] = createSplitProps<SegmentGroupItemContext>()(
      props,
      ['value', 'disabled', 'invalid'],
    )

    const api = useSegmentGroupContext()
    const mergedProps = mergeProps(
      api.getItemProps(itemProps),
      parts.item.attrs as Record<string, string>,
      localProps,
    )

    const itemState = api.getItemState(itemProps)
    const view = runIfFn(children, itemState)

    return (
      <SegmentGroupItemProvider value={props}>
        <ark.label {...mergedProps} ref={ref}>
          {view}
        </ark.label>
      </SegmentGroupItemProvider>
    )
  },
)

SegmentGroupItem.displayName = 'SegmentGroupItem'
