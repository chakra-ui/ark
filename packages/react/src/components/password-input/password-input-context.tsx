'use client'

import type { ReactNode } from 'react'
import type { UsePasswordInputReturn } from './use-password-input.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'

export interface PasswordInputContextProps {
  children: (context: UsePasswordInputReturn) => ReactNode
}

export const PasswordInputContext = (props: PasswordInputContextProps) => {
  return props.children(usePasswordInputContext())
}
