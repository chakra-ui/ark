import { createContext } from '$lib/utils/create-context'
import type { UseMeterReturn } from './use-meter.svelte.ts'

export interface UseMeterContext extends UseMeterReturn {}
export const [MeterProvider, useMeterContext] = createContext<UseMeterContext>({
  name: 'MeterContext',
})
