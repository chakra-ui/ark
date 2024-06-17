import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface PinInputControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    PinInputControlBaseProps {}

export const PinInputControl = (props: PinInputControlProps) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
