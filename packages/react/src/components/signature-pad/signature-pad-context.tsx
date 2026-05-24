'use client'

import type { ReactNode } from 'react'
import { type UseSignaturePadContext, useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadContextProps {
  children: (context: UseSignaturePadContext) => ReactNode
}

export const SignaturePadContext = (props: SignaturePadContextProps) => props.children(useSignaturePadContext())
