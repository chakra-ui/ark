import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupLabelProps = HTMLArkProps<'label'>

export const RadioGroupLabel = forwardRef<HTMLLabelElement, RadioGroupLabelProps>((props, ref) => {
  const { labelProps } = useRadioGroupContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

RadioGroupLabel.displayName = 'RadioGroupLabel'
