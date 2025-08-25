import { createMemo, Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { comboboxAnatomy } from './combobox.anatomy'
import { useComboboxContext } from './use-combobox-context'

const parts = comboboxAnatomy.build()

export interface ComboboxEmptyBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxEmptyProps extends HTMLProps<'div'>, ComboboxEmptyBaseProps {}

export const ComboboxEmpty = (props: ComboboxEmptyProps) => {
  const combobox = useComboboxContext()
  const size = createMemo(() => combobox().collection.size)

  return (
    <Show when={size() === 0}>
      <ark.div {...parts.empty.attrs} {...props} role="presentation" />
    </Show>
  )
}
