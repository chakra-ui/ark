import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-context'

export interface SegmentGroupItemTextProps extends HTMLArkProps<'span'> {}

export const SegmentGroupItemText = (props: SegmentGroupItemTextProps) => {
  const api = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(
    () => api().getItemTextProps(itemProps),
    segmentGroupAnatomy.build().itemText.attrs,
    props,
  )

  return <ark.span {...mergedProps} />
}
