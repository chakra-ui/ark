import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputInputProps = HTMLArkProps<'input'>

export const NumberInputInput = (props: NumberInputInputProps) => {
  const api = useNumberInputContext()
  const inputProps = mergeProps(() => api().inputProps, props)
  return <ark.input {...inputProps} />
}
