import { createMemo, Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { listboxAnatomy } from './listbox.anatomy'
import { useListboxContext } from './use-listbox-context'

const parts = listboxAnatomy.build()

export interface ListboxEmptyBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxEmptyProps extends HTMLProps<'div'>, ListboxEmptyBaseProps {}

export const ListboxEmpty = (props: ListboxEmptyProps) => {
  const listbox = useListboxContext()
  const size = createMemo(() => listbox().collection.size)

  return (
    <Show when={size() === 0}>
      <ark.div {...parts.empty.attrs} {...props} role="presentation" />
    </Show>
  )
}
