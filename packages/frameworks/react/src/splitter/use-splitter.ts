import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import * as splitter from '@zag-js/splitter'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseSplitterProps extends Optional<splitter.Context, 'id'> {
  /**
   * The initial size of the splitter.
   */
  defaultSize?: splitter.Context['size']
}

export interface UseSplitterReturn extends splitter.Api<PropTypes> {}

export const useSplitter = (props: UseSplitterProps): UseSplitterReturn => {
  const initialContext: splitter.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    size: props.defaultSize,
  }

  const context: splitter.Context = {
    ...initialContext,
    size: props.size,
    onSizeChange: useEvent(props.onSizeChange, { sync: true }),
    onSizeChangeEnd: useEvent(props.onSizeChangeEnd),
    onSizeChangeStart: useEvent(props.onSizeChangeStart),
  }

  const [state, send] = useMachine(splitter.machine(initialContext), { context })

  return splitter.connect(state, send, normalizeProps)
}
