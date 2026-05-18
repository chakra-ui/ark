import { createContext } from '../../utils/create-context.ts'
import type { UseSignaturePadReturn } from './use-signature-pad.ts'

export interface UseSignaturePadContext extends UseSignaturePadReturn {}

export const [SignaturePadProvider, useSignaturePadContext] = createContext<UseSignaturePadContext>({
  hookName: 'useSignaturePadContext',
  providerName: '<SignaturePadProvider />',
})
