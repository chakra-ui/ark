import type { JSX } from 'solid-js'
import { type UseGridVirtualizerContext, useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

export interface GridVirtualizerContextProps {
  children: (context: UseGridVirtualizerContext) => JSX.Element
}

export const GridVirtualizerContext = (props: GridVirtualizerContextProps) =>
  props.children(useGridVirtualizerContext())
