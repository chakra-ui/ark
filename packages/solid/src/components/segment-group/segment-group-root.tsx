import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseSegmentGroupProps, useSegmentGroup } from './use-segment-group.ts'
import { SegmentGroupProvider } from './use-segment-group-context.ts'
import type { RootState } from '@zag-js/radio-group'

export interface SegmentGroupRootState extends RootState {}

export interface SegmentGroupRootBaseProps
  extends UseSegmentGroupProps, PolymorphicProps<'div', SegmentGroupRootState> {}
export interface SegmentGroupRootProps extends HTMLProps<'div'>, SegmentGroupRootBaseProps {}

export const SegmentGroupRoot = (props: SegmentGroupRootProps) => {
  const [useSegmentGroupProps, localProps] = createSplitProps<UseSegmentGroupProps>()(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ])
  const segmentGroup = useSegmentGroup(useSegmentGroupProps)
  const mergedProps = mergeProps(() => segmentGroup().getRootProps(), localProps)

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} state={segmentGroup().getRootState()} />
    </SegmentGroupProvider>
  )
}
