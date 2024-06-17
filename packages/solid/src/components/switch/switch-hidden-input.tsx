import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface SwitchHiddenInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    SwitchHiddenInputBaseProps {}

export const SwitchHiddenInput = (props: SwitchHiddenInputProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
