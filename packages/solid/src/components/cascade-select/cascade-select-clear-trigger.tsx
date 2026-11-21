import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CascadeSelectClearTriggerProps extends HTMLProps<'button'>, CascadeSelectClearTriggerBaseProps {}

export const CascadeSelectClearTrigger = (props: CascadeSelectClearTriggerProps) => {
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getClearTriggerProps(), props)
  return <ark.button {...mergedProps} />
}
