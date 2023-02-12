import { normalizeProps, useMachine } from '@zag-js/react'
import { connect, Context, machine } from '@zag-js/splitter'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export type UseSplitterProps = Optional<Context, 'id'>
export type UseSplitterReturn = ReturnType<typeof useSplitter>

export const useSplitter = (props: UseSplitterProps) => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }
  const [state, send] = useMachine(machine(context), { context })

  return connect(state, send, normalizeProps)
}
