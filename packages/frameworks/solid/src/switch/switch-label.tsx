import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchLabelProps extends HTMLArkProps<'span'> {}

export const SwitchLabel = (props: SwitchLabelProps) => {
  const checkbox = useSwitchContext()
  const mergedProps = mergeProps(() => checkbox().labelProps, props)

  return <ark.span {...mergedProps} />
}
