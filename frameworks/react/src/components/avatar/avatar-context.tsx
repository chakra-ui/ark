import type { ReactNode } from 'react'
import { type UseAvatarContext, useAvatarContext } from './use-avatar-context'

export interface AvatarContextProps {
  children: (context: UseAvatarContext) => ReactNode
}

export const AvatarContext = (props: AvatarContextProps) => props.children(useAvatarContext())
