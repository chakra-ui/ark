import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CascadeSelectTriggerProps extends HTMLProps<'button'>, CascadeSelectTriggerBaseProps {}

export const CascadeSelectTrigger = (props: CascadeSelectTriggerProps) => {
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getTriggerProps(), props)
  return <ark.button {...mergedProps} />
}
