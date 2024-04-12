import type { Machine } from '@zag-js/core'
import * as menu from '@zag-js/menu'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UseMenuProps extends Omit<Optional<menu.Context, 'id'>, 'open.controlled'> {}

export interface UseMenuReturn {
  machine: Machine<menu.MachineContext, menu.MachineState>
  api: Accessor<menu.Api<PropTypes>>
}

export const useMenu = (props: UseMenuProps): UseMenuReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send, machine] = useMachine(menu.machine(context), { context })
  const api = createMemo(() => menu.connect(state, send, normalizeProps))

  return {
    api,
    machine,
  }
}
