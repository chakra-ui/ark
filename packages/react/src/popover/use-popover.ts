import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UsePopoverProps = Omit<popover.Context, 'id'>

export const usePopover = (props: UsePopoverProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })

  const [state, send] = useMachine(popover.machine(initialContext), { context: initialContext })
  const api = popover.connect(state, send, normalizeProps)
  return { api }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
