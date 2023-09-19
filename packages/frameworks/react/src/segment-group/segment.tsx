import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SegmentProvider, type SegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentProps = Assign<HTMLArkProps<'label'>, SegmentContext>

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
      <ark.label {...mergedProps} {...segmentGroupAnatomy.build().radio.attrs} ref={ref} />
      <input {...api.getRadioHiddenInputProps(segmentProps)} />
    </SegmentProvider>
  )
})

Segment.displayName = 'Segment'
