import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxClearTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const ComboboxClearTrigger = forwardRef<HTMLButtonElement, ComboboxClearTriggerProps>(
  (props, ref) => {
    const api = useComboboxContext()
    const mergedProps = mergeProps(api.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ComboboxClearTrigger.displayName = 'ComboboxClearTrigger'
