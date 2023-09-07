import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSelectContext } from './select-context'
import { parts } from './select.anatomy'

export type SelectValueProps = ComponentPropsWithoutRef<typeof ark.span>

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
