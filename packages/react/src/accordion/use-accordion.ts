import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UseAccordionProps = Omit<accordion.Context, 'id'> & {
  defaultValue?: accordion.Context['value']
}
export type UseAccordionReturn = ReturnType<typeof useAccordion>

export const useAccordion = (props: UseAccordionProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(accordion.machine(initialContext), { context })
  return accordion.connect(state, send, normalizeProps)
}
