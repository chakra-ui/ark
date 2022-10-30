import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { splitProps } from '../splitProps'

export type UseMenuProps = Omit<menu.Context, 'id'>

export const useMenu = <Props extends UseMenuProps>(props: Props) => {
  const [menuProps, htmlProps] = splitProps(props, [
    'activeId',
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'ids',
    'loop',
    'onSelect',
    'onValueChange',
    'positioning',
    'value',
  ])

  const [state, send, machine] = useMachine(
    menu.machine({
      id: useId(),
      ...menuProps,
    }),
  )

  const api = menu.connect(state, send, normalizeProps)

  return {
    api,
    htmlProps,
    machine,
  }
}

export type UseMenuReturn = ReturnType<typeof useMenu>
