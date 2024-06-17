import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectClearTriggerBaseProps extends PolymorphicProps {}
export interface SelectClearTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SelectClearTriggerBaseProps {}

export const SelectClearTrigger = forwardRef<HTMLButtonElement, SelectClearTriggerProps>(
  (props, ref) => {
    const select = useSelectContext()
    const mergedProps = mergeProps(select.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

SelectClearTrigger.displayName = 'SelectClearTrigger'
