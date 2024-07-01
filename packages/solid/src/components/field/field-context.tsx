import type { JSX } from 'solid-js'
import { type UseFieldContext, useFieldContext } from './use-field-context'

export interface FieldContextProps {
  children: (context: UseFieldContext) => JSX.Element
}

export const FieldContext = (props: FieldContextProps) => props.children(useFieldContext())
