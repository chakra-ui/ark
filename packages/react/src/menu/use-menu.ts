import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'
import type { OptionalId } from '../split-props'

export type UseMenuProps = OptionalId<menu.Context>

export type UseMenuReturn = {
  machine: ReturnType<typeof menu.machine>
  api: ReturnType<typeof menu.connect>
}

export const useMenu = (props: UseMenuProps): UseMenuReturn => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })

  const [state, send, machine] = useMachine(menu.machine(initialContext), {
    context: initialContext,
  })

  const api = menu.connect(state, send, normalizeProps)

  return {
    api,
    machine,
  }
}
