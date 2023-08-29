import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseAccordionProps = Optional<accordion.Context, 'id'> & {
  defaultValue?: accordion.Context['value']
}
export type UseAccordionReturn = accordion.Api

export const useAccordion = (props: UseAccordionProps): UseAccordionReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(accordion.machine(initialContext), { context })
  return accordion.connect(state, send, normalizeProps)
}
