import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchLabelProps extends HTMLArkProps<'span'> {}

export const SwitchLabel = (props: SwitchLabelProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.span {...mergedProps} />
}
