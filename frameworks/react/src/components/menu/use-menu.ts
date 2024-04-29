import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseMenuProps
  extends Optional<Omit<menu.Context, 'open.controlled' | 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial open state of the menu when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: menu.Context['open']
}
export interface UseMenuReturn {
  machine: menu.Service
  api: menu.Api<PropTypes>
}

export const useMenu = (props: UseMenuProps = {}): UseMenuReturn => {
  const { dir } = useLocaleContext()
  const context: menu.Context = {
    id: useId(),
    dir,
    getRootNode: useEnvironmentContext(),
    ...props,
    onOpenChange: useEvent(props.onOpenChange),
    onSelect: useEvent(props.onSelect),
    open: props.open ?? props.defaultOpen,
    'open.controlled': props.open !== undefined,
  }

  const [state, send, machine] = useMachine(menu.machine(context), { context })
  const api = menu.connect(state, send, normalizeProps)

  return { api, machine }
}
