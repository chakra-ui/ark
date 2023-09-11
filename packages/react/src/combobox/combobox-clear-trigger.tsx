import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxClearTriggerProps = HTMLArkProps<'button'>

export const ComboboxClearTrigger = forwardRef<HTMLButtonElement, ComboboxClearTriggerProps>(
  (props, ref) => {
    const { clearTriggerProps } = useComboboxContext()
    const mergedProps = mergeProps(clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ComboboxClearTrigger.displayName = 'ComboboxClearTrigger'
