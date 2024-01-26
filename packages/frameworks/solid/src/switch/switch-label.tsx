import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchLabelProps extends HTMLArkProps<'span'> {}

export const SwitchLabel: ArkComponent<'span'> = (props) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.span {...mergedProps} />
}
