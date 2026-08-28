'use client'

import type { ReactNode } from 'react'
import { type UseFieldContext, useFieldContext } from './use-field-context.ts'

export interface FieldContextProps {
  children: (context: UseFieldContext) => ReactNode
}

export const FieldContext = (props: FieldContextProps) => props.children(useFieldContext())
