import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxTriggerProps = HtmlArkProps<'button'>

export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>((props, ref) => {
  const { triggerProps } = useComboboxContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

ComboboxTrigger.displayName = 'ComboboxTrigger'
