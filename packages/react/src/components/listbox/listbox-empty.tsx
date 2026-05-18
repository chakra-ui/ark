'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { listboxAnatomy } from './listbox.anatomy.ts'
import { useListboxContext } from './use-listbox-context.ts'

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
