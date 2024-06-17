import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputInputBaseProps extends PolymorphicProps<'input'> {}
export interface NumberInputInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    NumberInputInputBaseProps {}

export const NumberInputInput = (props: NumberInputInputProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
