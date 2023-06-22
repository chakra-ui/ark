import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSegmentedContext } from './segmented-context'
import { useSegmentedGroupContext } from './segmented-group-context'

export type SegmentedInputProps = HTMLArkProps<'input'>

export const SegmentedInput = forwardRef<'input'>((props, ref) => {
  const { getRadioInputProps } = useSegmentedGroupContext()
  const context = useSegmentedContext()
  const mergedProps = mergeProps(getRadioInputProps(context), props)

  return <ark.input {...mergedProps} ref={ref} />
})
