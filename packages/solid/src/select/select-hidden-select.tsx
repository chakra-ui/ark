import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectHiddenSelectProps = HTMLArkProps<'select'>

export const SelectHiddenSelect = (props: SelectHiddenSelectProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().hiddenSelectProps, props)

  return <ark.select {...mergedProps} />
}
