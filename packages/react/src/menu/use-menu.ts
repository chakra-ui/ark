import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseMenuProps = Optional<menu.Context, 'id'>

export type UseMenuReturn = {
  machine: ReturnType<typeof menu.machine>
  api: menu.Api
}

export const useMenu = (props: UseMenuProps): UseMenuReturn => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send, machine] = useMachine(menu.machine(context), { context })
  const api = menu.connect(state, send, normalizeProps)
  return { api, machine }
}
