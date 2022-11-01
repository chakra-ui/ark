import * as pressable from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UsePressableProps = Omit<pressable.Context, 'id'>
export type UsePressableReturn = ReturnType<typeof usePressable>

export const usePressable = (props: UsePressableProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })
  const [state, send] = useMachine(pressable.machine(initialContext), { context: initialContext })

  return pressable.connect(state, send, normalizeProps)
}
