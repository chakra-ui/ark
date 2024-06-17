import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface NumberInputLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    NumberInputLabelBaseProps {}

export const NumberInputLabel = (props: NumberInputLabelProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
