import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ComboboxClearTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    ComboboxClearTriggerBaseProps {}

export const ComboboxClearTrigger = (props: ComboboxClearTriggerProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
