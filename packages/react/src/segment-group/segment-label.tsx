import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentLabelProps = HtmlArkProps<'span'>

export const SegmentLabel = forwardRef<HTMLSpanElement, SegmentLabelProps>((props, ref) => {
  const { getRadioLabelProps } = useSegmentGroupContext()
  const context = useSegmentContext()
  const mergedProps = mergeProps(getRadioLabelProps(context), props)

  return <ark.span {...mergedProps} {...parts.radioLabel.attrs} ref={ref} />
})

SegmentLabel.displayName = 'SegmentLabel'
