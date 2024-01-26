import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectTriggerProps extends HTMLArkProps<'button'> {}

export const SelectTrigger: ArkComponent<'button'> = (props) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().triggerProps, props)

  return <ark.button {...mergedProps} />
}
