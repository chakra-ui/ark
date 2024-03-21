import { createContext } from '../create-context'
import { type UseAvatarReturn } from './use-avatar'

export interface UseAvatarContext extends UseAvatarReturn {}

export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarContext>({
  name: 'AvatarContext',
  hookName: 'useAvatarContext',
  providerName: '<AvatarProvider />',
})

export interface AvatarContextProps {
  children: (api: UseAvatarReturn) => React.ReactNode
}

export const AvatarContext = (props: AvatarContextProps) => {
  const api = useAvatarContext()
  return props.children(api)
}
