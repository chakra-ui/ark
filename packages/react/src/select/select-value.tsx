import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'
import { parts } from './select.anatomy'

export type SelectValueProps = HTMLArkProps<'span'>

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>((props, ref) => {
  const { children, placeholder, ...rest } = props
  const api = useSelectContext()

  return (
    <ark.span {...parts.value.attrs} {...rest} ref={ref}>
      {children || api.valueAsString || placeholder}
    </ark.span>
  )
})

SelectValue.displayName = 'SelectValue'
