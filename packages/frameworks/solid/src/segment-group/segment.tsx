import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SegmentProvider, type SegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentProps = Assign<HTMLArkProps<'label'>, SegmentContext>

export const Segment = (props: SegmentProps) => {
  const [segmentProps, localProps] = createSplitProps<SegmentContext>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => api().getRadioProps(segmentProps),
    segmentGroupAnatomy.build().radio.attrs,
    localProps,
  )

  return (
    <SegmentProvider value={segmentProps}>
      <ark.label {...mergedProps} />
      <input {...api().getRadioHiddenInputProps(segmentProps)} />
    </SegmentProvider>
  )
}
