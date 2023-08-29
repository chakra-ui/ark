import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchControlProps = HTMLArkProps<'span'>

export const SwitchControl = (props: SwitchControlProps) => {
  const api = useSwitchContext()
  const controlProps = mergeProps(() => api().controlProps, props)
  return (
    <>
      <ark.span {...controlProps} />
      <input {...api().hiddenInputProps} />
    </>
  )
}
