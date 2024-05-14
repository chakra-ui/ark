import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as splitter from '@zag-js/splitter'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseSplitterProps
  extends Optional<Omit<splitter.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial size of the panels when it is first rendered.
   * Use this when you do not need to control the state of the carousel.
   */
  defaultSize?: splitter.Context['size']
}

export interface UseSplitterReturn extends splitter.Api<PropTypes> {}

export const useSplitter = (props: UseSplitterProps): UseSplitterReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: splitter.Context = {
    id: useId(),
    dir,
    getRootNode,
    size: props.defaultSize,
    ...props,
  }

  const context: splitter.Context = {
    ...initialContext,
    size: props.size,
    onSizeChange: useEvent(props.onSizeChange, { sync: true }),
    onSizeChangeEnd: useEvent(props.onSizeChangeEnd),
  }

  const [state, send] = useMachine(splitter.machine(initialContext), { context })

  return splitter.connect(state, send, normalizeProps)
}
