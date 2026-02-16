import type { ReactNode } from 'react'
import { useFieldContext } from './use-field-context'

export interface FieldContextProps {
  children: (context: ReturnType<typeof useFieldContext>) => ReactNode
}

export const FieldContext = (props: FieldContextProps) => props.children(useFieldContext())
