'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { comboboxAnatomy } from './combobox.anatomy.ts'
import { useComboboxContext } from './use-combobox-context.ts'

const parts = comboboxAnatomy.build()

export interface ComboboxEmptyBaseProps extends PolymorphicProps {}
export interface ComboboxEmptyProps extends HTMLProps<'div'>, ComboboxEmptyBaseProps {}

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>((props, ref) => {
  const { children, ...rest } = props
  const combobox = useComboboxContext()

  // the element stays mounted so the live region is already known to screen
  // readers when the message appears; only the children are conditional
  return (
    <ark.div {...parts.empty.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...rest} ref={ref}>
      {combobox.collection.size === 0 ? children : null}
    </ark.div>
  )
})

ComboboxEmpty.displayName = 'ComboboxEmpty'
