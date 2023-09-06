import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSelectContext } from './select-context'

export type SelectClearTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const SelectClearTrigger = forwardRef<HTMLButtonElement, SelectClearTriggerProps>(
  (props, ref) => {
    const api = useSelectContext()
    const mergedProps = mergeProps(api.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

SelectClearTrigger.displayName = 'SelectClearTrigger'
