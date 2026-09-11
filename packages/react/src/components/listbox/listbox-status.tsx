'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { listboxAnatomy } from './listbox.anatomy.ts'

const parts = listboxAnatomy.build()

export interface ListboxStatusBaseProps extends PolymorphicProps {}
export interface ListboxStatusProps extends HTMLProps<'div'>, ListboxStatusBaseProps {}

export const ListboxStatus = forwardRef<HTMLDivElement, ListboxStatusProps>((props, ref) => (
  <ark.div {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} ref={ref} />
))

ListboxStatus.displayName = 'ListboxStatus'
