import { selectAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useSelectContext } from './use-select-context'

export interface SelectValueTextProps extends HTMLArkProps<'span'> {
  placeholder?: string
}

export const SelectValueText = (props: SelectValueTextProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => selectAnatomy.build().valueText.attrs, props)

  return <ark.span {...mergedProps}>{api().valueAsString || props.placeholder}</ark.span>
}
