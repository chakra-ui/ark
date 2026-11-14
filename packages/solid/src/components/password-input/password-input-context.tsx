import type { JSX } from '@solidjs/web'
import { type UsePasswordInputContext, usePasswordInputContext } from './use-password-input-context.ts'

export interface PasswordInputContextProps {
  children: (context: UsePasswordInputContext) => JSX.Element
}

export const PasswordInputContext = (props: PasswordInputContextProps) => props.children(usePasswordInputContext())
