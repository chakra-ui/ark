import { createContext } from '../../utils'
import type { UseSignaturePadReturn } from './use-signature-pad'

export interface UseSignaturePadContext extends UseSignaturePadReturn {}
export const [SignaturePadProvider, useSignaturePadContext] =
  createContext<UseSignaturePadContext>('SignaturePadContext')
