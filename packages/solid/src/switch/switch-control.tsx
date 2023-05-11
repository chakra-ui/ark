import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchControlProps = HTMLArkProps<'span'>

export const SwitchControl = (props: SwitchControlProps) => {
  const checkbox = useSwitchContext()
  const controlProps = mergeProps(() => checkbox().controlProps, props)
  return <ark.span {...controlProps} />
}
