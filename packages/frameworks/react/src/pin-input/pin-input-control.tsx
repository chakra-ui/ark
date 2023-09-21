import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export interface PinInputControlProps extends HTMLArkProps<'div'> {}

export const PinInputControl = forwardRef<HTMLDivElement, PinInputControlProps>((props, ref) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PinInputControl.displayName = 'PinInputControl'
