import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentControlProps = HTMLArkProps<'div'>

export const SegmentControl = forwardRef<'div'>((props, ref) => {
  const { getRadioControlProps } = useSegmentGroupContext()
  const context = useSegmentContext()
  const mergedProps = mergeProps(getRadioControlProps(context), props)

  return <ark.div {...mergedProps} {...parts.radioControl.attrs} ref={ref} />
})
