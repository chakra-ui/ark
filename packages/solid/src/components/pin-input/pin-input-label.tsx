import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputLabelProps extends HTMLArkProps<'label'> {}

export const PinInputLabel = (props: PinInputLabelProps) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
