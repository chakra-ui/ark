import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputInputBaseProps extends PolymorphicProps<'input'> {}
export interface NumberInputInputProps extends HTMLProps<'input'>, NumberInputInputBaseProps {}

export const NumberInputInput = (props: NumberInputInputProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} />
}
