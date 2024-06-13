import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export type ComboboxClearTriggerBaseProps = {}
export interface ComboboxClearTriggerProps
  extends HTMLArkProps<'button'>,
    ComboboxClearTriggerBaseProps {}

export const ComboboxClearTrigger = forwardRef<HTMLButtonElement, ComboboxClearTriggerProps>(
  (props, ref) => {
    const combobox = useComboboxContext()
    const mergedProps = mergeProps(combobox.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ComboboxClearTrigger.displayName = 'ComboboxClearTrigger'
