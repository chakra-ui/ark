import type { JSX } from 'solid-js'
import { type UsePinInputContext, usePinInputContext } from './use-pin-input-context'

export interface PinInputContextProps {
  children: (context: UsePinInputContext) => JSX.Element
}

export const PinInputContext = (props: PinInputContextProps) => props.children(usePinInputContext())
