import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export interface PinInputLabelProps extends HTMLArkProps<'label'> {}

export const PinInputLabel = (props: PinInputLabelProps) => {
  const api = usePinInputContext()
  const labelProps = mergeProps(() => api().labelProps, props)
  return <ark.label {...labelProps} />
}
