import type { JSX } from 'solid-js'
import { type UseFieldsetContext, useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetContextProps {
  children: (context: UseFieldsetContext) => JSX.Element
}

export const FieldsetContext = (props: FieldsetContextProps) => props.children(useFieldsetContext())
