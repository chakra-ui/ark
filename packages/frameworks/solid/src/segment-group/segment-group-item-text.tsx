import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'

export interface SegmentGroupItemTextProps extends HTMLArkProps<'span'> {}

export const SegmentGroupItemText = (props: SegmentGroupItemTextProps) => {
  const api = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemContext()
  const mergedProps = mergeProps(
    () => api().getItemTextProps(itemProps),
    segmentGroupAnatomy.build().itemText.attrs,
    props,
  )

  return <ark.span {...mergedProps} />
}
