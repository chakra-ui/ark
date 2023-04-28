import { children, createEffect, type JSX } from 'solid-js'
import { spread } from '../spread'
import { ssrSpread } from '../ssr-spread'
import { usePopoverContext } from './popover-context'

export type PopoverAnchorProps = { children: JSX.Element }

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const popover = usePopoverContext()

  const anchorProps = popover().anchorProps
  const getChildren = children(() => ssrSpread(props.children, anchorProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, anchorProps)
    }
  })

  return getChildren()
}
