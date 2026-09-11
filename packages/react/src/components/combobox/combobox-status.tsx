'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { comboboxAnatomy } from './combobox.anatomy.ts'

const parts = comboboxAnatomy.build()

export interface ComboboxStatusBaseProps extends PolymorphicProps {}
export interface ComboboxStatusProps extends HTMLProps<'div'>, ComboboxStatusBaseProps {}

export const ComboboxStatus = forwardRef<HTMLDivElement, ComboboxStatusProps>((props, ref) => (
  <ark.div {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} ref={ref} />
))

ComboboxStatus.displayName = 'ComboboxStatus'
