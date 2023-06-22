import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { SegmentedGroupProvider } from './segmented-group-context'
import { useSegmentedGroup, type UseSegmentedGroupProps } from './use-segmented-group'

export type SegmentedGroupProps = Assign<HTMLArkProps<'div'>, UseSegmentedGroupProps>

export const SegmentedGroup = forwardRef<'div', UseSegmentedGroupProps>((props, ref) => {
  const [useSegmentedGroupProps, divProps] = createSplitProps<UseSegmentedGroupProps>()(props, [
    'defaultValue',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'name',
    'onChange',
    'orientation',
    'readOnly',
    'value',
  ])
  const segmentedGroup = useSegmentedGroup(useSegmentedGroupProps)
  const mergedProps = mergeProps(segmentedGroup.rootProps, divProps)

  return (
    <SegmentedGroupProvider value={segmentedGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </SegmentedGroupProvider>
  )
})
