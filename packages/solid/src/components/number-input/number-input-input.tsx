import type { InputState } from '@zag-js/number-input'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputInputState extends InputState {}

export interface NumberInputInputBaseProps extends PolymorphicProps<'input', NumberInputInputState> {}
export interface NumberInputInputProps extends HTMLProps<'input'>, NumberInputInputBaseProps {}

export const NumberInputInput = (props: NumberInputInputProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.().ariaDescribedby} {...mergedProps} state={api().getInputState()} />
}
