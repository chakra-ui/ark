import type { Machine } from '@zag-js/core'
import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '~/providers/environment'
import type { Optional } from '~/types'
import { useEvent } from '~/utils/use-event'

export interface UseMenuProps extends Omit<Optional<menu.Context, 'id'>, 'open.controlled'> {}
export interface UseMenuReturn {
  machine: Machine<menu.MachineContext, menu.MachineState>
  api: menu.Api<PropTypes>
}

export const useMenu = (props: UseMenuProps = {}): UseMenuReturn => {
  const context: menu.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    onOpenChange: useEvent(props.onOpenChange),
    onSelect: useEvent(props.onSelect),
    'open.controlled': props.open !== undefined,
  }

  const [state, send, machine] = useMachine(menu.machine(context), { context })
  const api = menu.connect(state, send, normalizeProps)

  return { api, machine }
}
