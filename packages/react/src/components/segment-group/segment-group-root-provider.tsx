import { mergeProps } from '@zag-js/react'
import { anatomy } from '@zag-js/segmentGroup'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseSegmentGroupReturn } from './use-segment-group'
import { SegmentGroupProvider } from './use-segment-group-context'

interface RootProviderProps {
  value: UseSegmentGroupReturn
}

export interface SegmentGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SegmentGroupRootProviderProps
  extends HTMLProps<'div'>,
    SegmentGroupRootProviderBaseProps {}

export const SegmentGroupRootProvider = forwardRef<HTMLDivElement, SegmentGroupRootProviderProps>(
  (props, ref) => {
    const [{ value: segmentGroup }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(
      segmentGroup.getRootProps(),
      segmentGroupAnatomy.build().root.attrs as Record<string, string>,
      localProps,
    )

    return (
      <SegmentGroupProvider value={segmentGroup}>
        <ark.div {...mergedProps} ref={ref} />
      </SegmentGroupProvider>
    )
  },
)

SegmentGroupRootProvider.displayName = 'SegmentGroupRootProvider'
