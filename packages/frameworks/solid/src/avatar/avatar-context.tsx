import { type JSX } from 'solid-js'
import { useAvatarContext, type UseAvatarContext } from './use-avatar-context'

export interface AvatarContextProps {
  children: (api: UseAvatarContext) => JSX.Element
}

export const AvatarContext = (props: AvatarContextProps) => props.children(useAvatarContext())
