import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'

export type UseAccordionProps = Omit<accordion.Context, 'id'> & {
  defaultValue?: accordion.Context['value']
}

export function useAccordion(context: UseAccordionProps) {
  const [state, send] = useMachine(
    accordion.machine({
      id: createUniqueId(),
      ...context,
      value: context.defaultValue ?? context.value,
    }),
    {
      context: {
        value: context.value,
      },
    },
  )
  return createMemo(() => accordion.connect(state, send, normalizeProps))
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>
