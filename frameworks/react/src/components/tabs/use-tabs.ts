import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as tabs from '@zag-js/tabs'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseTabsProps extends Optional<Omit<tabs.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the tabs when it is first rendered.
   * Use when you do not need to control the state of the tabs.
   */
  defaultValue?: tabs.Context['value']
}

export interface UseTabsReturn extends tabs.Api<PropTypes> {}

export const useTabs = (props: UseTabsProps): UseTabsReturn => {
  const { dir } = useLocaleContext()
  const initialContext: tabs.Context = {
    id: useId(),
    dir,
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: tabs.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onFocusChange: useEvent(props.onFocusChange),
  }

  const [state, send] = useMachine(tabs.machine(initialContext), { context })

  return tabs.connect(state, send, normalizeProps)
}
