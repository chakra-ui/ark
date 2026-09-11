import { createMemo, Show, splitProps } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { listboxAnatomy } from './listbox.anatomy.ts'
import { useListboxContext } from './use-listbox-context.ts'

const parts = listboxAnatomy.build()

export interface ListboxEmptyBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxEmptyProps extends HTMLProps<'div'>, ListboxEmptyBaseProps {}

export const ListboxEmpty = (props: ListboxEmptyProps) => {
  const [localProps, restProps] = splitProps(props, ['children'])
  const listbox = useListboxContext()
  const isEmpty = createMemo(() => listbox().collection.size === 0)

  // the element stays mounted so the live region is already known to screen
  // readers when the message appears; only the children are conditional
  return (
    <ark.div {...parts.empty.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...restProps}>
      <Show when={isEmpty()}>{localProps.children}</Show>
    </ark.div>
  )
}
