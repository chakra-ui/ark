import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface NumberInputControlProps extends HTMLProps<'div'>, NumberInputControlBaseProps {}

export const NumberInputControl = (props: NumberInputControlProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
