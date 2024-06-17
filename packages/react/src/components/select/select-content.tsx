import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectContentBaseProps extends PolymorphicProps {}
export interface SelectContentProps
  extends HTMLAttributes<HTMLDivElement>,
    SelectContentBaseProps {}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const select = useSelectContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(select.getContentProps(), presence.getPresenceProps(ref), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

SelectContent.displayName = 'SelectContent'
