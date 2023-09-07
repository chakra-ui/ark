import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

type ValueProps = {
  placeholder?: string
}

export type SelectValueProps = HTMLArkProps<'span'> & ValueProps

export const SelectValue = (props: SelectValueProps) => {
  const api = useSelectContext()

  return <ark.span {...props}>{api().valueAsString || props.placeholder}</ark.span>
}
