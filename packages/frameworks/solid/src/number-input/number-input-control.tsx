import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputControlProps = HTMLArkProps<'div'>

export const NumberInputControl = (props: NumberInputControlProps) => {
  const api = useNumberInputContext()
  const controlProps = mergeProps(() => api().controlProps, props)
  return <ark.div {...controlProps} />
}
