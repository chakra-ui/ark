import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchControlProps extends HTMLArkProps<'span'> {}

export const SwitchControl = (props: SwitchControlProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return (
    <>
      <ark.span {...mergedProps} />
      <input {...api().hiddenInputProps} />
    </>
  )
}
