import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface PinInputLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    PinInputLabelBaseProps {}

export const PinInputLabel = (props: PinInputLabelProps) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
