import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputFieldProps = HTMLArkProps<'input'>

export const NumberInputField = (props: NumberInputFieldProps) => {
  const api = useNumberInputContext()
  const inputProps = mergeProps(() => api().inputProps, props)
  return <ark.input {...inputProps} />
}
