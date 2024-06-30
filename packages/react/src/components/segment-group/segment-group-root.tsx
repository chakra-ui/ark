import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './segment-group.anatomy'
import { type UseSegmentGroupProps, useSegmentGroup } from './use-segment-group'
import { SegmentGroupProvider } from './use-segment-group-context'

export interface SegmentGroupRootBaseProps extends UseSegmentGroupProps, PolymorphicProps {}
export interface SegmentGroupRootProps
  extends Assign<HTMLProps<'div'>, SegmentGroupRootBaseProps> {}

export const SegmentGroupRoot = forwardRef<HTMLDivElement, SegmentGroupRootProps>((props, ref) => {
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
    segmentGroup.getRootProps(),
    parts.root.attrs as Record<string, string>,
    localProps,
  )

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </SegmentGroupProvider>
  )
})

SegmentGroupRoot.displayName = 'SegmentGroupRoot'
