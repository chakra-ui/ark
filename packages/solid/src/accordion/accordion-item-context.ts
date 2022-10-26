import { createContext, useContext } from 'solid-js'

const AccordionItemContext = createContext(
  {} as {
    value: string
    disabled: boolean
  },
)

export const AccordionItemContextProvider = AccordionItemContext.Provider

export function useAccordionItemContext() {
  return useContext(AccordionItemContext)
}
