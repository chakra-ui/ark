import { selectAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectValueProps extends HTMLArkProps<'span'> {}

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>((props, ref) => {
  const { children, placeholder, ...rest } = props
  const api = useSelectContext()

  return (
    <ark.span {...selectAnatomy.build().value.attrs} {...rest} ref={ref}>
      {children || api.valueAsString || placeholder}
    </ark.span>
  )
})

SelectValue.displayName = 'SelectValue'
