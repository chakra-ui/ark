import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { listboxAnatomy } from './listbox.anatomy'
import { useListboxContext } from './use-listbox-context'

const parts = listboxAnatomy.build()

export interface ListboxEmptyBaseProps extends PolymorphicProps {}
export interface ListboxEmptyProps extends HTMLProps<'div'>, ListboxEmptyBaseProps {}

export const ListboxEmpty = forwardRef<HTMLDivElement, ListboxEmptyProps>((props, ref) => {
  const listbox = useListboxContext()

  if (listbox.collection.size !== 0) {
    return null
  }

  return <ark.div {...parts.empty.attrs} {...props} role="presentation" ref={ref} />
})

ListboxEmpty.displayName = 'ListboxEmpty'
