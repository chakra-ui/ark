import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectClearTriggerBaseProps extends PolymorphicProps {}
export interface SelectClearTriggerProps extends HTMLProps<'button'>, SelectClearTriggerBaseProps {}

export const SelectClearTrigger = forwardRef<HTMLButtonElement, SelectClearTriggerProps>(
  (props, ref) => {
    const select = useSelectContext()
    const mergedProps = mergeProps(select.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

SelectClearTrigger.displayName = 'SelectClearTrigger'
