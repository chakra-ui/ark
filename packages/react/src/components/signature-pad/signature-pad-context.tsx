import type { ReactNode } from 'react'
import { type UseSignaturePadContext, useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadContextProps {
  children: (context: UseSignaturePadContext) => ReactNode
}

export const SignaturePadContext = (props: SignaturePadContextProps) => props.children(useSignaturePadContext())
