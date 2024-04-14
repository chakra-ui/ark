import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectLabelProps extends HTMLArkProps<'label'> {}

export const SelectLabel = (props: SelectLabelProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
