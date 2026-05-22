'use client'

import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { listboxAnatomy } from './listbox.anatomy'
import { useListboxContext } from './use-listbox-context'

const parts = listboxAnatomy.build()

export interface ListboxEmptyBaseProps extends PolymorphicProps {}
export interface ListboxEmptyProps extends HTMLProps<'div'>, ListboxEmptyBaseProps {}

export const ListboxEmpty = ({ ref, ...props }: ListboxEmptyProps) => {
  const listbox = useListboxContext()

  if (listbox.collection.size !== 0) {
    return null
  }

  return <ark.div {...parts.empty.attrs} {...props} role="presentation" ref={ref} />
}

ListboxEmpty.displayName = 'ListboxEmpty'
