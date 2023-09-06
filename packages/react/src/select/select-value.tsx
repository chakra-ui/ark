import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSelectContext } from './select-context'

export type SelectValueProps = ComponentPropsWithoutRef<typeof ark.span>

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>((props, ref) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(api.valueAsString, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SelectValue.displayName = 'SelectValue'
