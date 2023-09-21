import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { HoverCardProvider, type HoverCardContext } from './hover-card-context'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'

export interface HoverCardProps
  extends Assign<
    UseHoverCardProps,
    { children?: ReactNode | ((props: HoverCardContext) => ReactNode) }
  > {}

export const HoverCard = (props: HoverCardProps) => {
  const { children, ...useHoverCardProps } = props
  const api = useHoverCard(useHoverCardProps)
  const view = runIfFn(children, api)

  return <HoverCardProvider value={api}>{view}</HoverCardProvider>
}
