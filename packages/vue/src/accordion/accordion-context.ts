import { type connect } from '@zag-js/accordion'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [AccordionProvider, useAccordionContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('AccordionContext')
