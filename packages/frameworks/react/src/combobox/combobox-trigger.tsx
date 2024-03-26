import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxTriggerProps extends HTMLArkProps<'button'> {}

export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>((props, ref) => {
  const context = useComboboxContext()
  const mergedProps = mergeProps(context.triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

ComboboxTrigger.displayName = 'ComboboxTrigger'
