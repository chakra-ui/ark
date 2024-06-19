import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseSegmentGroupReturn } from './use-segment-group'
import { SegmentGroupProvider } from './use-segment-group-context'

interface RootProviderProps {
  value: UseSegmentGroupReturn
}

export interface SegmentGroupRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface SegmentGroupRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    SegmentGroupRootProviderBaseProps {}

export const SegmentGroupRootProvider = (props: SegmentGroupRootProviderProps) => {
  const [{ value: segmentGroup }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
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
