import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSegmentGroupContext } from './segment-group-context'
import { SegmentProvider, type SegmentGroupItemContext } from './segment-group-item-context'

export interface SegmentGroupItemProps
  extends Assign<HTMLArkProps<'label'>, SegmentGroupItemContext> {}

export const SegmentGroupItem = (props: SegmentGroupItemProps) => {
  const [itemProps, restProps] = createSplitProps<SegmentGroupItemContext>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => api().getItemProps(itemProps),
    segmentGroupAnatomy.build().item.attrs,
    restProps,
  )

  return (
    <SegmentProvider value={itemProps}>
      <ark.label {...mergedProps} />
    </SegmentProvider>
  )
}
