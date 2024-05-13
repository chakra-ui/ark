import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseSegmentGroupProps, useSegmentGroup } from './use-segment-group'
import { SegmentGroupProvider } from './use-segment-group-context'

export interface SegmentGroupRootProps extends Assign<HTMLArkProps<'div'>, UseSegmentGroupProps> {}

export const SegmentGroupRoot = (props: SegmentGroupRootProps) => {
  const [useSegmentGroupProps, localProps] = createSplitProps<UseSegmentGroupProps>()(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'value',
  ])
  const segmentGroup = useSegmentGroup(useSegmentGroupProps)
  const mergedProps = mergeProps(
    () => segmentGroup().rootProps,
    segmentGroupAnatomy.build().root.attrs,
    localProps,
  )

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} />
    </SegmentGroupProvider>
  )
}
