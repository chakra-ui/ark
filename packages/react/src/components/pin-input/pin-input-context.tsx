import type { ReactNode } from 'react'
import { type UsePinInputContext, usePinInputContext } from './use-pin-input-context'

export interface PinInputContextProps {
  children: (context: UsePinInputContext) => ReactNode
}

export const PinInputContext = (props: PinInputContextProps) => props.children(usePinInputContext())
