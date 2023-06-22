import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSegmentedContext } from './segmented-context'
import { useSegmentedGroupContext } from './segmented-group-context'

export type SegmentedControlProps = HTMLArkProps<'div'>

export const SegmentedControl = forwardRef<'div'>((props, ref) => {
  const { getRadioControlProps } = useSegmentedGroupContext()
  const context = useSegmentedContext()
  const mergedProps = mergeProps(getRadioControlProps(context), props)

  return <ark.div {...mergedProps} ref={ref} />
})
