import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectClearTriggerProps extends HTMLArkProps<'button'> {}

export const SelectClearTrigger = forwardRef<HTMLButtonElement, SelectClearTriggerProps>(
  (props, ref) => {
    const context = useSelectContext()
    const mergedProps = mergeProps(context.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

SelectClearTrigger.displayName = 'SelectClearTrigger'
