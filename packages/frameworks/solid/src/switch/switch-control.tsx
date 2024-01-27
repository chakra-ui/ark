import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchControlProps extends HTMLArkProps<'span'> {}

export const SwitchControl: ArkComponent<'span'> = (props: SwitchControlProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return (
    <>
      <ark.span {...mergedProps} />
      <input {...api().hiddenInputProps} />
    </>
  )
}
