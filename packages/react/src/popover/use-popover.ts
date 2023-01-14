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
    console.log({ isOpen })

    if (isOpen == null) {
      console.log('isOpen nullish')
      return
    }

    console.log('changes', state.changed.toString())

    if (isOpen && !state.matches('open')) {
      console.log('open')

      apiRef.current.open()
    } else if (!isOpen && !state.matches('closed')) {
      console.log('close')
      apiRef.current.close()
    }
  }, [isOpen, state, apiRef])

  return api
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
