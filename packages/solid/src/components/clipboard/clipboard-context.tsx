import type { JSX } from '@solidjs/web'
import { type UseClipboardContext, useClipboardContext } from './use-clipboard-context.ts'

export interface ClipboardContextProps {
  children: (context: UseClipboardContext) => JSX.Element
}

export const ClipboardContext = (props: ClipboardContextProps) => props.children(useClipboardContext())
