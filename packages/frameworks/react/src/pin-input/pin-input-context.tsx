import { usePinInputContext, type UsePinInputContext } from './use-pin-input-context'

export interface PinInputContextProps {
  children: (context: UsePinInputContext) => React.ReactNode
}

export const PinInputContext = (props: PinInputContextProps) => props.children(usePinInputContext())
