import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchHiddenInputProps extends HTMLArkProps<'input'> {}

export const SwitchHiddenInput = (props: SwitchHiddenInputProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
