'use client'

import type { ReactNode } from 'react'
import { type UseDateInputContext, useDateInputContext } from './use-date-input-context'

export interface DateInputContextProps {
  children: (context: UseDateInputContext) => ReactNode
}

export const DateInputContext = (props: DateInputContextProps) => props.children(useDateInputContext())
