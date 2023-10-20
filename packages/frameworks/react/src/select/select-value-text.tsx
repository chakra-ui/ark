import { selectAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectValueTextProps extends HTMLArkProps<'span'> {}

export const SelectValueText = forwardRef<HTMLSpanElement, SelectValueTextProps>((props, ref) => {
  const { children, placeholder, ...rest } = props
  const api = useSelectContext()

  return (
    <ark.span {...selectAnatomy.build().valueText.attrs} {...rest} ref={ref}>
      {children || api.valueAsString || placeholder}
    </ark.span>
  )
})

SelectValueText.displayName = 'SelectValueText'
