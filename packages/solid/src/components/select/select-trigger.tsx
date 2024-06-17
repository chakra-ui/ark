import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface SelectTriggerProps extends HTMLProps<'button'>, SelectTriggerBaseProps {}

export const SelectTrigger = (props: SelectTriggerProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
