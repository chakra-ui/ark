import type { JSX } from 'solid-js'
import { usePinInputContext, type UsePinInputContext } from './use-pin-input-context'

export interface PinInputContextProps {
  children: (context: UsePinInputContext) => JSX.Element
}

export const PinInputContext = (props: PinInputContextProps) => props.children(usePinInputContext())
