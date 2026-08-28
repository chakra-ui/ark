import { createContext } from '$lib/utils/create-context'
import type { UseSignaturePadReturn } from './use-signature-pad.svelte.ts'

export interface UseSignaturePadContext extends UseSignaturePadReturn {}

export const [SignaturePadProvider, useSignaturePadContext] = createContext<UseSignaturePadContext>({
  name: 'SignaturePadContext',
  hookName: 'useSignaturePadContext',
  providerName: '<SignaturePadProvider />',
})
