import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SegmentGroupProvider } from './segment-group-context'
import { parts } from './segment-group.anatomy'
import { useSegmentGroup, type UseSegmentGroupProps } from './use-segment-group'

export type SegmentGroupProps = Assign<HTMLArkProps<'div'>, UseSegmentGroupProps>

export const SegmentGroup = (props: SegmentGroupProps) => {
  const [groupParams, localProps] = createSplitProps<UseSegmentGroupProps>()(props, [
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'name',
    'onValueChange',
    'orientation',
    'value',
  ])

  const api = useSegmentGroup(groupParams)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <SegmentGroupProvider value={api}>
      <ark.div {...mergedProps} {...parts.root.attrs} />
    </SegmentGroupProvider>
  )
}
