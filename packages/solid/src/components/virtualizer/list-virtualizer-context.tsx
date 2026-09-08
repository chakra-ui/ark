import type { JSX } from 'solid-js'
import { type UseListVirtualizerContext, useListVirtualizerContext } from './use-list-virtualizer-context.ts'

export interface ListVirtualizerContextProps {
  children: (context: UseListVirtualizerContext) => JSX.Element
}

export const ListVirtualizerContext = (props: ListVirtualizerContextProps) =>
  props.children(useListVirtualizerContext())
