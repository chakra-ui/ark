import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputControlProps extends HTMLArkProps<'div'> {}

export const PinInputControl = forwardRef<HTMLDivElement, PinInputControlProps>((props, ref) => {
  const context = usePinInputContext()
  const mergedProps = mergeProps(context.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PinInputControl.displayName = 'PinInputControl'
