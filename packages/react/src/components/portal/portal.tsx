import { getDocument, isShadowRoot } from '@zag-js/dom-query'
import { Children, type PropsWithChildren, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { type RootNode, useEnvironmentContext } from '../../providers'
import { useIsServer } from '../../utils/use-is-server'

export interface PortalProps {
  disabled?: boolean
  container?: RefObject<HTMLElement>
}

export const Portal = (props: PropsWithChildren<PortalProps>) => {
  const { children, container, disabled } = props
  const isServer = useIsServer()
  const { getRootNode } = useEnvironmentContext()

  if (isServer || disabled) return <>{children}</>

  const mountNode = container?.current ?? getPortalNode(getRootNode)
  return <>{Children.map(children, (child) => createPortal(child, mountNode))}</>
}

function getPortalNode(cb: () => RootNode) {
  const node = cb?.()
  const rootNode = node.getRootNode()
  if (isShadowRoot(rootNode)) return rootNode
  return getDocument(node).body
}
