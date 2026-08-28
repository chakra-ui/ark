'use client'

import type { ReactNode } from 'react'
import { type UseToastContext, useToastContext } from './use-toast-context.ts'

export interface ToastContextProps {
  children: (context: UseToastContext) => ReactNode
}

export const ToastContext = (props: ToastContextProps) => props.children(useToastContext())
