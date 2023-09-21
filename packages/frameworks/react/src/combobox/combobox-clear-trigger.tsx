import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxClearTriggerProps extends HTMLArkProps<'button'> {}

export const ComboboxClearTrigger = forwardRef<HTMLButtonElement, ComboboxClearTriggerProps>(
  (props, ref) => {
    const api = useComboboxContext()
    const mergedProps = mergeProps(api.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ComboboxClearTrigger.displayName = 'ComboboxClearTrigger'
