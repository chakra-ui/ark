import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchInputProps = HTMLArkProps<'input'>

export const SwitchInput = (props: SwitchInputProps) => {
  const checkbox = useSwitchContext()
  const inputProps = mergeProps(() => checkbox().inputProps, props)
  return <ark.input {...inputProps} />
}
