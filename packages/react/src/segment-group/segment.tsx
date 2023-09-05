import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { SegmentProvider, type SegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentProps = Assign<ComponentPropsWithoutRef<typeof ark.label>, SegmentContext>

export const Segment = forwardRef<HTMLLabelElement, SegmentProps>((props, ref) => {
  const [segmentProps, localProps] = createSplitProps<SegmentContext>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useSegmentGroupContext()
  const mergedProps = mergeProps(api.getRadioProps(segmentProps), localProps)

  return (
    <SegmentProvider value={segmentProps}>
      <ark.label {...mergedProps} {...parts.radio.attrs} ref={ref} />
    </SegmentProvider>
  )
})

Segment.displayName = 'Segment'
