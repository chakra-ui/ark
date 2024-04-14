import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputLabelProps extends HTMLArkProps<'label'> {}

export const NumberInputLabel = (props: NumberInputLabelProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
