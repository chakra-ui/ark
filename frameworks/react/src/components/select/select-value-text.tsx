import { selectAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { useSelectContext } from './use-select-context'

export interface SelectValueTextProps extends HTMLArkProps<'span'> {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string
}

export const SelectValueText = forwardRef<HTMLSpanElement, SelectValueTextProps>((props, ref) => {
  const { children, placeholder, ...rest } = props
  const select = useSelectContext()

  return (
    <ark.span {...selectAnatomy.build().valueText.attrs} {...rest} ref={ref}>
      {children || select.valueAsString || placeholder}
    </ark.span>
  )
})

SelectValueText.displayName = 'SelectValueText'
