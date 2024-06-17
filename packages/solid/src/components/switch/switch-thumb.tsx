import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchThumbBaseProps extends PolymorphicProps<'span'> {}
export interface SwitchThumbProps extends HTMLProps<'span'>, SwitchThumbBaseProps {}

export const SwitchThumb = (props: SwitchThumbProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().getThumbProps(), props)

  return <ark.span {...mergedProps} />
}
