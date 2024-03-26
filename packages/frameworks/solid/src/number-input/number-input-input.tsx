import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputInputProps extends HTMLArkProps<'input'> {}

export const NumberInputInput = (props: NumberInputInputProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().inputProps, props)

  return <ark.input {...mergedProps} />
}
