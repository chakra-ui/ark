import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePinInputContext } from './pin-input-context'

export type PinInputLabelProps = HTMLArkProps<'label'>

export const PinInputLabel = forwardRef<'label', PinInputLabelProps>((props, ref) => {
  const { labelProps } = usePinInputContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
