import { Children, cloneElement, type ReactElement } from 'react'
import { usePopoverContext } from './popover-context'

export type PopoverAnchorProps = { children: ReactElement }

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const { anchorProps } = usePopoverContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, anchorProps)
}
