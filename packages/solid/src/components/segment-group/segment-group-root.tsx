import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseSegmentGroupProps, useSegmentGroup } from './use-segment-group'
import { SegmentGroupProvider } from './use-segment-group-context'

export interface SegmentGroupRootBaseProps extends UseSegmentGroupProps, PolymorphicProps<'div'> {}
export interface SegmentGroupRootProps extends HTMLProps<'div'>, SegmentGroupRootBaseProps {}

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
    () => segmentGroup().getRootProps(),
    segmentGroupAnatomy.build().root.attrs,
    localProps,
  )

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} />
    </SegmentGroupProvider>
  )
}
