import { selectAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

interface ElementProps {
  placeholder?: string
}

export interface SelectValueTextProps extends HTMLArkProps<'span'>, ElementProps {}

export const SelectValueText = (props: SelectValueTextProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => selectAnatomy.build().valueText.attrs, props)

  return <ark.span {...mergedProps}>{api().valueAsString || props.placeholder}</ark.span>
}
