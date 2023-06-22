import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentInputProps = HTMLArkProps<'input'>

export const SegmentInput = forwardRef<'input'>((props, ref) => {
  const { getRadioInputProps } = useSegmentGroupContext()
  const context = useSegmentContext()
  const mergedProps = mergeProps(getRadioInputProps(context), props)

  return <ark.input {...mergedProps} {...parts.radioInput.attrs} ref={ref} />
})
