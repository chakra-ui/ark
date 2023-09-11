import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputLabelProps = HTMLArkProps<'label'>

export const PinInputLabel = forwardRef<HTMLLabelElement, PinInputLabelProps>((props, ref) => {
  const { labelProps } = usePinInputContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

PinInputLabel.displayName = 'PinInputLabel'
