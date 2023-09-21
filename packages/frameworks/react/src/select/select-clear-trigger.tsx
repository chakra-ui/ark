import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectClearTriggerProps extends HTMLArkProps<'button'> {}

export const SelectClearTrigger = forwardRef<HTMLButtonElement, SelectClearTriggerProps>(
  (props, ref) => {
    const api = useSelectContext()
    const mergedProps = mergeProps(api.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

SelectClearTrigger.displayName = 'SelectClearTrigger'
