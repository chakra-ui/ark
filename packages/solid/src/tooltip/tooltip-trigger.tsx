import { children, createEffect } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { spread } from 'solid-js/web'
import { useTooltipContext } from './tooltip-context'

export type TooltipTriggerProps = { children: JSX.Element }

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const tooltip = useTooltipContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, tooltip().triggerProps)
    }
  })

  return <>{getChildren()}</>
}
