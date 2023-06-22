import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { SegmentedProvider, type SegmentedContext } from './segmented-context'
import { useSegmentedGroupContext } from './segmented-group-context'

export type SegmentedProps = Assign<HTMLArkProps<'label'>, SegmentedContext>

export const Segmented = forwardRef<'label', SegmentedContext>((props, ref) => {
  const { value, disabled, invalid, readOnly, ...divProps } = props
  const { getRadioProps } = useSegmentedGroupContext()
  const mergedProps = mergeProps(getRadioProps({ value, disabled }), divProps)

  return (
    <SegmentedProvider value={{ value, disabled, invalid, readOnly }}>
      <ark.label {...mergedProps} ref={ref} />
    </SegmentedProvider>
  )
})
