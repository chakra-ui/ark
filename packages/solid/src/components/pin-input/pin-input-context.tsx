import type { JSX } from '@solidjs/web'
import { type UsePinInputContext, usePinInputContext } from './use-pin-input-context.ts'

export interface PinInputContextProps {
  children: (context: UsePinInputContext) => JSX.Element
}

export const PinInputContext = (props: PinInputContextProps) => props.children(usePinInputContext())
