import { normalizeProps, useMachine } from '@zag-js/react'
import * as splitter from '@zag-js/splitter'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSplitterProps = Optional<splitter.Context, 'id'> & {
  defaultSize?: splitter.Context['size']
}

export type UseSplitterReturn = ReturnType<typeof useSplitter>

export const useSplitter = (props: UseSplitterProps) => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    size: props.defaultSize,
  }

  const context = {
    ...initialContext,
    size: props.size,
  }

  const [state, send] = useMachine(splitter.machine(initialContext), { context })

  return splitter.connect(state, send, normalizeProps)
}
