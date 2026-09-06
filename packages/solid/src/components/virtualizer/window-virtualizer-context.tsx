import type { JSX } from 'solid-js'
import { type UseWindowVirtualizerContext, useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

export interface WindowVirtualizerContextProps {
  children: (context: UseWindowVirtualizerContext) => JSX.Element
}

export const WindowVirtualizerContext = (props: WindowVirtualizerContextProps) =>
  props.children(useWindowVirtualizerContext())
