import { createContext } from '../../utils/create-context'
import type { UseSignaturePadReturn } from './use-signature-pad'

export interface UseSignaturePadContext extends UseSignaturePadReturn {}

export const [SignaturePadProvider, useSignaturePadContext] = createContext<UseSignaturePadContext>(
  {
    hookName: 'useSignaturePadContext',
    providerName: '<SignaturePadProvider />',
  },
)
