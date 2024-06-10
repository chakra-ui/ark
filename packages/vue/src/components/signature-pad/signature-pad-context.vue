import type { JSX } from 'solid-js'
import { type UseSignaturePadContext, useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadContextProps {
  children: (context: UseSignaturePadContext) => JSX.Element
}

export const SignaturePadContext = (props: SignaturePadContextProps) =>
  props.children(useSignaturePadContext())
