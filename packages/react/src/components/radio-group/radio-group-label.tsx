import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupLabelProps extends HTMLArkProps<'label'> {}

export const RadioGroupLabel = forwardRef<HTMLLabelElement, RadioGroupLabelProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(radioGroup.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

RadioGroupLabel.displayName = 'RadioGroupLabel'
