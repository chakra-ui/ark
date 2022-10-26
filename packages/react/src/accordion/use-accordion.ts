import * as accordion from '@zag-js/accordion'
import { useMachine, normalizeProps } from '@zag-js/react'
import { useId } from 'react'

export const useAccordion = (props: Omit<accordion.Context, 'id'>) => {
  const [state, send] = useMachine(
    accordion.machine({
      id: useId(),
      ...props,
    }),
  )
  return accordion.connect(state, send, normalizeProps)
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>
