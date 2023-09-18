import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchLabelProps = HTMLArkProps<'span'>

export const SwitchLabel = (props: SwitchLabelProps) => {
  const checkbox = useSwitchContext()
  const labelProps = mergeProps(() => checkbox().labelProps, props)
  return <ark.span {...labelProps} />
}
