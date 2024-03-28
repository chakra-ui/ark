import type { JSX } from 'solid-js'
import { useClipboardContext, type UseClipboardContext } from './use-clipboard-context'

export interface ClipboardContextProps {
  children: (context: UseClipboardContext) => JSX.Element
}

export const ClipboardContext = (props: ClipboardContextProps) =>
  props.children(useClipboardContext())
