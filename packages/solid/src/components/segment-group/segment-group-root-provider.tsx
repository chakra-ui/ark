import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseSegmentGroupReturn } from './use-segment-group.ts'
import { SegmentGroupProvider } from './use-segment-group-context.ts'
import type { RootState } from '@zag-js/radio-group'

interface RootProviderProps {
  value: UseSegmentGroupReturn
}

export interface SegmentGroupRootProviderState extends RootState {}

export interface SegmentGroupRootProviderBaseProps extends PolymorphicProps<'div', SegmentGroupRootProviderState> {}
export interface SegmentGroupRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, SegmentGroupRootProviderBaseProps {}

export const SegmentGroupRootProvider = (props: SegmentGroupRootProviderProps) => {
  const [{ value: segmentGroup }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => segmentGroup().getRootProps(), localProps)

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} state={segmentGroup().getRootState()} />
    </SegmentGroupProvider>
  )
}
