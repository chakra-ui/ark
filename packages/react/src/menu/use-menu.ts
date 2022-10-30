import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'
import { OptionalId, splitProps } from '../split-props'

export type UseMenuProps = OptionalId<menu.Context> & { isOpen?: boolean }

export const useMenu = <Props extends UseMenuProps>(props: Props) => {
  const [menuProps, htmlProps] = splitProps(props, [
    'activeId',
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'loop',
    'onSelect',
    'onValueChange',
    'positioning',
  ])

  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...menuProps,
  })

  const [state, send, machine] = useMachine(menu.machine(initialContext))

  const api = menu.connect(state, send, normalizeProps)

  return {
    api,
    htmlProps,
    machine,
  }
}

export type UseMenuReturn = ReturnType<typeof useMenu>
