'use client'

import type { ReactNode } from 'react'
import { type UseFieldsetContext, useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetContextProps {
  children: (context: UseFieldsetContext) => ReactNode
}

export const FieldsetContext = (props: FieldsetContextProps) => props.children(useFieldsetContext())
