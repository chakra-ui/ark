import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentControlProps = HTMLArkProps<'div'>

export const SegmentControl = forwardRef<HTMLDivElement, SegmentControlProps>((props, ref) => {
  const api = useSegmentGroupContext()
  const segmentProps = useSegmentContext()
  const mergedProps = mergeProps(api.getRadioControlProps(segmentProps), props)

  return <ark.div {...mergedProps} {...parts.radioControl.attrs} ref={ref} />
})

SegmentControl.displayName = 'SegmentControl'
