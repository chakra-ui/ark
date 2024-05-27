import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemControlProps extends HTMLArkProps<'div'> {}

export const SegmentGroupItemControl = (props: SegmentGroupItemControlProps) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(
    () => segmentGroup().getItemControlProps(itemProps),
    segmentGroupAnatomy.build().itemControl.attrs,
    props,
  )

  return <ark.div {...mergedProps} />
}
