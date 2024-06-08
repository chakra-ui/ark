import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputControlProps extends HTMLArkProps<'div'> {}

export const NumberInputControl = (props: NumberInputControlProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
