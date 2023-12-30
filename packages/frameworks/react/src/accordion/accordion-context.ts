import { createContext } from '../create-context'
// import type { UsePresenceProps } from '../presence'
// import { type UseAccordionReturn } from './use-accordion'

export type AccordionContext = unknown // type `UseAccordionReturn['api']` can't be named

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContext>({
  name: 'AccordionContext',
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

export type AccordionMachineContext = unknown // type `UseAccordionReturn['machine']` can't be named

export const [AccordionMachineProvider, useAccordionMachineContext] = createContext<
  AccordionMachineContext | undefined
>({
  name: 'AccordionMachineContext',
  hookName: 'useAccordionMachineContext',
  providerName: '<AccordionMachineProvider />',
  strict: false,
})
