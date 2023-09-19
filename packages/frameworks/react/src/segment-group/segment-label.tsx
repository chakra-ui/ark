import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentLabelProps = HTMLArkProps<'span'>

export const SegmentLabel = forwardRef<HTMLSpanElement, SegmentLabelProps>((props, ref) => {
  const { getRadioLabelProps } = useSegmentGroupContext()
  const context = useSegmentContext()
  const mergedProps = mergeProps(getRadioLabelProps(context), props)

  return <ark.span {...mergedProps} {...segmentGroupAnatomy.build().radioLabel.attrs} ref={ref} />
})

SegmentLabel.displayName = 'SegmentLabel'
