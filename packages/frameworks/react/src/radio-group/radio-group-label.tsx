import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export interface RadioGroupLabelProps extends HTMLArkProps<'label'> {}

export const RadioGroupLabel = forwardRef<HTMLLabelElement, RadioGroupLabelProps>((props, ref) => {
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

RadioGroupLabel.displayName = 'RadioGroupLabel'
