import * as menu from '@zag-js/menu'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseMenuProps extends Omit<Optional<menu.Context, 'id'>, 'open.controlled'> {}

export interface UseMenuReturn {
  machine: menu.Service
  api: Accessor<menu.Api<PropTypes>>
}

export const useMenu = (props: UseMenuProps): UseMenuReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps(
    { id: createUniqueId(), getRootNode, 'open.controlled': props.open !== undefined },
    props,
  )
  const [state, send, machine] = useMachine(menu.machine(context), { context })
  const api = createMemo(() => menu.connect(state, send, normalizeProps))

  return {
    api,
    machine,
  }
}
