import { children, createEffect } from 'solid-js'
import { type JSX } from 'solid-js/jsx-runtime'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useTooltipContext } from './tooltip-context'

export type TooltipTriggerProps = { children: JSX.Element }

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const tooltip = useTooltipContext()
  const triggerProps = tooltip().triggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren()
}
