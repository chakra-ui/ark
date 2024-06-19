import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface NumberInputLabelProps extends HTMLProps<'label'>, NumberInputLabelBaseProps {}

export const NumberInputLabel = (props: NumberInputLabelProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
