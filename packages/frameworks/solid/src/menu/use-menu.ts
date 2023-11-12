import * as menu from '@zag-js/menu'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseMenuProps extends Optional<menu.Context, 'id'> {}

export type UseMenuReturn = () => {
  machine: ReturnType<typeof menu.machine>
  api: Accessor<menu.Api<PropTypes>>
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
