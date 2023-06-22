import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { SegmentProvider, type SegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentProps = Assign<HTMLArkProps<'label'>, SegmentContext>

export const Segment = forwardRef<'label', SegmentContext>((props, ref) => {
  const { value, disabled, invalid, readOnly, ...divProps } = props
  const { getRadioProps } = useSegmentGroupContext()
  const mergedProps = mergeProps(getRadioProps({ value, disabled }), divProps)

  return (
    <SegmentProvider value={{ value, disabled, invalid, readOnly }}>
      <ark.label {...mergedProps} {...parts.radio.attrs} ref={ref} />
    </SegmentProvider>
  )
})
