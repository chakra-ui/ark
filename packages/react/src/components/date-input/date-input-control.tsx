import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputControlBaseProps extends PolymorphicProps {}
export interface DateInputControlProps extends HTMLProps<'div'>, DateInputControlBaseProps {}

export const DateInputControl = forwardRef<HTMLDivElement, DateInputControlProps>((props, ref) => {
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DateInputControl.displayName = 'DateInputControl'
