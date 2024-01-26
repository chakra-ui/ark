import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export interface PinInputLabelProps extends HTMLArkProps<'label'> {}

export const PinInputLabel: ArkComponent<'label'> = (props: PinInputLabelProps) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
