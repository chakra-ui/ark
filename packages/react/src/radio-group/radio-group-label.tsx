import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupLabelProps = HTMLArkProps<'label'>

export const RadioGroupLabel = forwardRef<'label'>((props, ref) => {
  const { labelProps } = useRadioGroupContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
