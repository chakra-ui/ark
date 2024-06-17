import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchLabelBaseProps extends PolymorphicProps<'span'> {}
export interface SwitchLabelProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    SwitchLabelBaseProps {}

export const SwitchLabel = (props: SwitchLabelProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.span {...mergedProps} />
}
