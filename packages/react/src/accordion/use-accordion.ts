import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'
import { splitProps } from '../split-props'

export type UseAccordionProps = Omit<accordion.Context, 'id'> & {
  defaultValue?: accordion.Context['value']
}
export type UseAccordionReturn = ReturnType<typeof useAccordion>

export const useAccordion = (props: UseAccordionProps) => {
  const [{ value, defaultValue }, accordionProps, htmlProps] = splitProps(
    props,
    ['value', 'defaultValue'],
    ['collapsible', 'dir', 'disabled', 'getRootNode', 'ids', 'multiple', 'onChange', 'value'],
  )
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...accordionProps,
    value: value ?? defaultValue,
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value,
  })

  const [state, send] = useMachine(accordion.machine(initialContext), { context })
  return { api: accordion.connect(state, send, normalizeProps), htmlProps }
}
