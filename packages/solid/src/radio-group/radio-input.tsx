import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioInputProps = HTMLArkProps<'input'>

export const RadioInput = (props: RadioInputProps) => {
  const api = useRadioGroupContext()
  const radioParams = useRadioContext()

  const inputProps = mergeProps(() => api().getRadioInputProps(radioParams), props)
  return <ark.input {...inputProps} />
}
