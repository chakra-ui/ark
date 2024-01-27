import { selectAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

interface ElementProps {
  placeholder?: string
}

export interface SelectValueTextProps extends HTMLArkProps<'span'>, ElementProps {}

export const SelectValueText: ArkComponent<'span', ElementProps> = (
  props: SelectValueTextProps,
) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => selectAnatomy.build().valueText.attrs, props)

  return <ark.span {...mergedProps}>{api().valueAsString || props.placeholder}</ark.span>
}
