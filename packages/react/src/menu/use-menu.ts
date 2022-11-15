import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseMenuProps = Optional<menu.Context, 'id'>

export type UseMenuReturn = {
  machine: ReturnType<typeof menu.machine>
  api: ReturnType<typeof menu.connect>
}

export const useMenu = (props: UseMenuProps): UseMenuReturn => {
  const context = {
    id: useId(),
    ...props,
  }

  const [state, send, machine] = useMachine(menu.machine(context), { context })
  const api = menu.connect(state, send, normalizeProps)
  return { api, machine }
}
