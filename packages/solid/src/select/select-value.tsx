import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectValueProps extends HTMLArkProps<'span'> {
  placeholder?: string
}

export const SelectValue = (props: SelectValueProps) => {
  const api = useSelectContext()

  return <ark.span {...props}>{api().valueAsString || props.placeholder}</ark.span>
}
