import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchControlBaseProps extends PolymorphicProps<'span'> {}
export interface SwitchControlProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    SwitchControlBaseProps {}

export const SwitchControl = (props: SwitchControlProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.span {...mergedProps} />
}
