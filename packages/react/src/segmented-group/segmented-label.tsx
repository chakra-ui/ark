import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSegmentedContext } from './segmented-context'
import { useSegmentedGroupContext } from './segmented-group-context'

export type SegmentedLabelProps = HTMLArkProps<'span'>

export const SegmentedLabel = forwardRef<'span'>((props, ref) => {
  const { getRadioLabelProps } = useSegmentedGroupContext()
  const context = useSegmentedContext()
  const mergedProps = mergeProps(getRadioLabelProps(context), props)

  return <ark.span {...mergedProps} ref={ref} />
})
