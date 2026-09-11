import { createMemo, Show, splitProps } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { comboboxAnatomy } from './combobox.anatomy.ts'
import { useComboboxContext } from './use-combobox-context.ts'

const parts = comboboxAnatomy.build()

export interface ComboboxEmptyBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxEmptyProps extends HTMLProps<'div'>, ComboboxEmptyBaseProps {}

export const ComboboxEmpty = (props: ComboboxEmptyProps) => {
  const [localProps, restProps] = splitProps(props, ['children'])
  const combobox = useComboboxContext()
  const isEmpty = createMemo(() => combobox().collection.size === 0)

  // the element stays mounted so the live region is already known to screen
  // readers when the message appears; only the children are conditional
  return (
    <ark.div {...parts.empty.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...restProps}>
      <Show when={isEmpty()}>{localProps.children}</Show>
    </ark.div>
  )
}
