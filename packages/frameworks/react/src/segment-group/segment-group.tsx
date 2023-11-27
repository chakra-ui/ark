import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { SegmentGroupProvider } from './segment-group-context'
import { useSegmentGroup, type UseSegmentGroupProps } from './use-segment-group'

export interface SegmentGroupProps extends Assign<HTMLArkProps<'div'>, UseSegmentGroupProps> {}

export const SegmentGroup = forwardRef<HTMLDivElement, SegmentGroupProps>((props, ref) => {
  const [useSegmentGroupProps, divProps] = createSplitProps<UseSegmentGroupProps>()(props, [
    'defaultValue',
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
  const api = useSegmentGroup(useSegmentGroupProps)
  const mergedProps = mergeProps(
    api.rootProps,
    segmentGroupAnatomy.build().root.attrs as Record<string, string>,
    divProps,
  )

  return (
    <SegmentGroupProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
    </SegmentGroupProvider>
  )
})

SegmentGroup.displayName = 'SegmentGroup'
