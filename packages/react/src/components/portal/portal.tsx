import { getDocument, isShadowRoot } from '@zag-js/dom-query'
import { Children, type PropsWithChildren, type RefObject, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { type RootNode, useEnvironmentContext } from '../../providers'
import { useIsServer } from '../../utils/use-is-server'

export interface PortalProps {
  disabled?: boolean
  container?: RefObject<HTMLElement>
}

export const Portal = (props: PropsWithChildren<PortalProps>) => {
  const [container, setContainer] = useState(props.container?.current)
  const { children, disabled } = props
  const isServer = useIsServer()
  const { getRootNode } = useEnvironmentContext()

  useEffect(() => {
    setContainer(() => {
      return props.container?.current
    })
  }, [props.container?.current])

  if (isServer || disabled) return <>{children}</>

  const mountNode = container ?? getPortalNode(getRootNode)
  return <>{Children.map(children, (child) => createPortal(child, mountNode))}</>
}

function getPortalNode(cb: () => RootNode) {
  const node = cb?.()
  const rootNode = node.getRootNode()
  if (isShadowRoot(rootNode)) return rootNode
  return getDocument(node).body
}
