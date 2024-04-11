import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseAccordionProps extends Optional<accordion.Context, 'id'> {
  /**
   * The initial value of the accordion.
   */
  defaultValue?: accordion.Context['value']
}

export interface UseAccordionReturn extends accordion.Api<PropTypes> {}

export const useAccordion = (props: UseAccordionProps = {}): UseAccordionReturn => {
  const initialContext: accordion.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: accordion.Context = {
    ...initialContext,
    value: props.value,
    onFocusChange: useEvent(props.onFocusChange),
    onValueChange: useEvent(props.onValueChange),
  }

  const [state, send] = useMachine(accordion.machine(initialContext), { context })
  return accordion.connect(state, send, normalizeProps)
}
