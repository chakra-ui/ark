import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePinInputContext } from './use-pin-input-context.ts'
import type { LabelState } from '@zag-js/pin-input'

export interface PinInputLabelState extends LabelState {}

export interface PinInputLabelBaseProps extends PolymorphicProps<'label', PinInputLabelState> {}
export interface PinInputLabelProps extends HTMLProps<'label'>, PinInputLabelBaseProps {}

export const PinInputLabel = (props: PinInputLabelProps) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} state={api().getLabelState()} />
}
