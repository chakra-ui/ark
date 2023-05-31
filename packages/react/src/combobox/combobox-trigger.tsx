import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useComboboxContext } from './combobox-context'

export type ComboboxTriggerProps = HTMLArkProps<'button'>

export const ComboboxTrigger = forwardRef<'button'>((props, ref) => {
  const { triggerProps } = useComboboxContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
