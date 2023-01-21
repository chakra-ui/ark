import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useEffect, useId } from 'react'
import type { Optional } from '../types'
import { useLatestRef } from '../use-latest-ref'

export type UsePopoverProps = Optional<popover.Context, 'id'> & {
  /**
   * Control the open state of the popover.
   *
   * @default false
   */
  isOpen?: boolean
}

export const usePopover = (props: UsePopoverProps) => {
  const { isOpen, ...restProps } = props
  const context = {
    id: useId(),
    ...restProps,
  }

  const [state, send] = useMachine(popover.machine(context), { context })
  const api = popover.connect(state, send, normalizeProps)
  const apiRef = useLatestRef(api)

  useEffect(() => {
    if (isOpen == null) {
      return
    }

    if (isOpen && !state.matches('open')) {
      apiRef.current.open()
    } else if (!isOpen && !state.matches('closed')) {
      apiRef.current.close()
    }
  }, [isOpen, state, apiRef])

  return api
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
