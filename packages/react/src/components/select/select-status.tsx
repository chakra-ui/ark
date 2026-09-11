'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { selectAnatomy } from './select.anatomy.ts'

const parts = selectAnatomy.build()

export interface SelectStatusBaseProps extends PolymorphicProps {}
export interface SelectStatusProps extends HTMLProps<'div'>, SelectStatusBaseProps {}

export const SelectStatus = forwardRef<HTMLDivElement, SelectStatusProps>((props, ref) => (
  <ark.div {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} ref={ref} />
))

SelectStatus.displayName = 'SelectStatus'
