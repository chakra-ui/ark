import type { ReactNode } from 'react'
import { useFieldsetContext } from './use-fieldset-context'

export interface FieldsetContextProps {
  children: (context: ReturnType<typeof useFieldsetContext>) => ReactNode
}

export const FieldsetContext = (props: FieldsetContextProps) => props.children(useFieldsetContext())
