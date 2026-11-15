import type { TriggerState } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectTriggerState extends TriggerState {}

export interface SelectTriggerBaseProps extends PolymorphicProps<'button', SelectTriggerState> {}
export interface SelectTriggerProps extends HTMLProps<'button'>, SelectTriggerBaseProps {}

export const SelectTrigger = (props: SelectTriggerProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getTriggerProps(), props)
  const field = useFieldContext()

  return <ark.button aria-describedby={field?.().ariaDescribedby} {...mergedProps} state={select().getTriggerState()} />
}
