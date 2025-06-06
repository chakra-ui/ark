import type { JSX } from 'solid-js'
import { type UsePasswordInputContext, usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputContextProps {
  children: (context: UsePasswordInputContext) => JSX.Element
}

export const PasswordInputContext = (props: PasswordInputContextProps) => props.children(usePasswordInputContext())
