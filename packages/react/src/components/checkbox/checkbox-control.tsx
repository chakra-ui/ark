import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxControlBaseProps extends PolymorphicProps {}
export interface CheckboxControlProps
  extends HTMLAttributes<HTMLDivElement>,
    CheckboxControlBaseProps {}

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>((props, ref) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CheckboxControl.displayName = 'CheckboxControl'
