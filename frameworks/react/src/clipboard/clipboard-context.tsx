import type { ReactNode } from 'react'
import { useClipboardContext, type UseClipboardContext } from './use-clipboard-context'

export interface ClipboardContextProps {
  children: (context: UseClipboardContext) => ReactNode
}

export const ClipboardContext = (props: ClipboardContextProps) =>
  props.children(useClipboardContext())
