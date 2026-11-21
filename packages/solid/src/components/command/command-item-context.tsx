import type { JSX } from '@solidjs/web'
import { type UseCommandItemContext, useCommandItemContext } from './use-command-item-context.ts'

export interface CommandItemContextProps {
  children: (context: UseCommandItemContext) => JSX.Element
}

export const CommandItemContext = (props: CommandItemContextProps) => props.children(useCommandItemContext())
