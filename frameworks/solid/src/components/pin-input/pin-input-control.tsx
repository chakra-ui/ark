import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputControlProps extends HTMLArkProps<'div'> {}

export const PinInputControl = (props: PinInputControlProps) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
