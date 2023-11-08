import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseMenuProps extends Optional<menu.Context, 'id'> {
  open?: boolean
}

export interface UseMenuReturn {
  machine: ReturnType<typeof menu.machine>
  api: menu.Api
}

export const useMenu = (props: UseMenuProps = {}): UseMenuReturn => {
  const context: menu.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    onOpenChange: useEvent(props.onOpenChange),
    onSelect: useEvent(props.onSelect),
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }

  const [state, send, machine] = useMachine(menu.machine(context), { context })
  const api = menu.connect(state, send, normalizeProps)

  return { api, machine }
}
