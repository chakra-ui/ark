import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-context'

export interface SegmentGroupItemControlProps extends HTMLArkProps<'div'> {}

export const SegmentGroupItemControl = (props: SegmentGroupItemControlProps) => {
  const api = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
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
