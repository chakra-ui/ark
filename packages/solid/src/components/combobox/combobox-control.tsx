import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxControlBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ComboboxControlBaseProps {}

export const ComboboxControl = (props: ComboboxControlProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
