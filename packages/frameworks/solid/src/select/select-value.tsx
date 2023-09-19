import { selectAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectValueProps extends HTMLArkProps<'span'> {
  placeholder?: string
}

export const SelectValue = (props: SelectValueProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => selectAnatomy.build().value.attrs, props)

  return <ark.span {...mergedProps}>{api().valueAsString || props.placeholder}</ark.span>
}
