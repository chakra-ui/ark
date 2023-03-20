import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseMenuProps = Optional<menu.Context, 'id'>

export type UseMenuReturn = () => {
  machine: ReturnType<typeof menu.machine>
  api: () => ReturnType<typeof menu.connect>
}

export const useMenu = (props: UseMenuProps): UseMenuReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send, machine] = useMachine(menu.machine(context), { context })

  return createMemo(() => ({
    api: () => menu.connect(state, send, normalizeProps),
    machine: machine,
  }))
}
