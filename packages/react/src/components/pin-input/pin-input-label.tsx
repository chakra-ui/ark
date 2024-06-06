import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputLabelProps extends HTMLArkProps<'label'> {}

export const PinInputLabel = forwardRef<HTMLLabelElement, PinInputLabelProps>((props, ref) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(pinInput.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

PinInputLabel.displayName = 'PinInputLabel'
