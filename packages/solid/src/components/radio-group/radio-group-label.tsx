import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupLabelProps extends HTMLArkProps<'label'> {}

export const RadioGroupLabel = (props: RadioGroupLabelProps) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(() => radioGroup().labelProps, props)

  return <ark.label {...mergedProps} />
}
