import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectTriggerProps extends HTMLArkProps<'button'> {}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>((props, ref) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(api.triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

SelectTrigger.displayName = 'SelectTrigger'
