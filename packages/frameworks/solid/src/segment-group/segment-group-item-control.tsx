import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'

export type SegmentGroupItemControlProps = HTMLArkProps<'div'>

export const SegmentGroupItemControl = (props: SegmentGroupItemControlProps) => {
  const api = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemContext()
  const mergedProps = mergeProps(() => api().getItemControlProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
