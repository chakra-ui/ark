import type { ReactNode } from 'react'
import { useAvatarContext, type UseAvatarContext } from './use-avatar-context'

export interface AvatarContextProps {
  children: (context: UseAvatarContext) => ReactNode
}

export const AvatarContext = (props: AvatarContextProps) => props.children(useAvatarContext())
