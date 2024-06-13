import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export type SelectClearTriggerBaseProps = {}
export interface SelectClearTriggerProps
  extends HTMLArkProps<'button'>,
    SelectClearTriggerBaseProps {}

export const SelectClearTrigger = forwardRef<HTMLButtonElement, SelectClearTriggerProps>(
  (props, ref) => {
    const select = useSelectContext()
    const mergedProps = mergeProps(select.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

SelectClearTrigger.displayName = 'SelectClearTrigger'
