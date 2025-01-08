import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseProgressProps
  extends Optional<Omit<progress.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the progress when it is first rendered.
   * Use when you do not need to control the state of the progress.
   */
  defaultValue?: progress.Context['value']
}

export interface UseProgressReturn extends progress.Api<PropTypes> {}

export const useProgress = (props: UseProgressProps = {}): UseProgressReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: progress.Context = {
    id: useId(),
    dir,
    getRootNode,
    value: props.defaultValue,
    ...props,
  }

  const context: progress.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }

  const [state, send] = useMachine(progress.machine(initialContext), { context })
  return progress.connect(state, send, normalizeProps)
}
