import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectContentProps extends HTMLArkProps<'div'> {}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const select = useSelectContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(select.contentProps, presence.getPresenceProps(ref), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

SelectContent.displayName = 'SelectContent'
