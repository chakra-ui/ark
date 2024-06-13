import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export type PinInputControlBaseProps = {}
export interface PinInputControlProps extends HTMLArkProps<'div'>, PinInputControlBaseProps {}

export const PinInputControl = forwardRef<HTMLDivElement, PinInputControlProps>((props, ref) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(pinInput.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PinInputControl.displayName = 'PinInputControl'
