import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchThumbProps extends HTMLArkProps<'span'> {}

export const SwitchThumb: ArkComponent<'span'> = (props: SwitchThumbProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().thumbProps, props)

  return <ark.span {...mergedProps} />
}
