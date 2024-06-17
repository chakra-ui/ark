import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchThumbBaseProps extends PolymorphicProps<'span'> {}
export interface SwitchThumbProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    SwitchThumbBaseProps {}

export const SwitchThumb = (props: SwitchThumbProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().getThumbProps(), props)

  return <ark.span {...mergedProps} />
}
