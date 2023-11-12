import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'

export interface SegmentGroupItemControlProps extends HTMLArkProps<'div'> {}

export const SegmentGroupItemControl = (props: SegmentGroupItemControlProps) => {
  const api = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemContext()
  const mergedProps = mergeProps(
    () => api().getItemControlProps(itemProps),
    segmentGroupAnatomy.build().itemControl.attrs,
    props,
  )

  return (
    <>
      <ark.div {...mergedProps} />
      <input {...api().getItemHiddenInputProps(itemProps)} />
    </>
  )
}
