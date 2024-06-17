import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface SelectClearTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    SelectClearTriggerBaseProps {}

export const SelectClearTrigger = (props: SelectClearTriggerProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
