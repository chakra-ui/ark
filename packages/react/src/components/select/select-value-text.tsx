import { selectAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectValueTextBaseProps extends PolymorphicProps {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string
}
export interface SelectValueTextProps extends HTMLProps<'span'>, SelectValueTextBaseProps {}

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
