'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { listboxAnatomy } from './listbox.anatomy.ts'
import { useListboxContext } from './use-listbox-context.ts'

const parts = listboxAnatomy.build()

export interface ListboxEmptyBaseProps extends PolymorphicProps {}
export interface ListboxEmptyProps extends HTMLProps<'div'>, ListboxEmptyBaseProps {}

export const ListboxEmpty = forwardRef<HTMLDivElement, ListboxEmptyProps>((props, ref) => {
  const { children, ...rest } = props
  const listbox = useListboxContext()

  // the element stays mounted so the live region is already known to screen
  // readers when the message appears; only the children are conditional
  return (
    <ark.div {...parts.empty.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...rest} ref={ref}>
      {listbox.collection.size === 0 ? children : null}
    </ark.div>
  )
})

ListboxEmpty.displayName = 'ListboxEmpty'
