import {
  Children,
  type PropsWithChildren,
  type ReactNode,
  type ReactPortal,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { useEnvironmentContext } from './environment'

export interface PortalProps {
  disabled?: boolean
  container?: RefObject<HTMLElement>
}

const isServer = typeof window === 'undefined'

export const Portal = (
  props: PropsWithChildren<PortalProps>,
): ReactPortal[] | ReactNode | null | undefined => {
  const { children, container, disabled } = props
  const getRootNode = useEnvironmentContext()

  if (isServer || disabled) return children

  const doc = getRootNode?.().ownerDocument ?? document
  const mountNode = container?.current ?? doc.body

  return Children.map(children, (child) => createPortal(child, mountNode))
}
