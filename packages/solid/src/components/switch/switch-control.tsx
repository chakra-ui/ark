import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchControlBaseProps extends PolymorphicProps<'span'> {}
export interface SwitchControlProps extends HTMLProps<'span'>, SwitchControlBaseProps {}

export const SwitchControl = (props: SwitchControlProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.span {...mergedProps} />
}
