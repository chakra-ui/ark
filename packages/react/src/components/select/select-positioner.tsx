import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectPositionerProps extends HTMLArkProps<'div'> {}

export const SelectPositioner = forwardRef<HTMLDivElement, SelectPositionerProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

SelectPositioner.displayName = 'SelectPositioner'
