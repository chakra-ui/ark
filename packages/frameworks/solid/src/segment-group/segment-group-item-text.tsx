import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'

export type SegmentGroupItemTextProps = HTMLArkProps<'span'>

export const SegmentGroupItemText = (props: SegmentGroupItemTextProps) => {
  const api = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
