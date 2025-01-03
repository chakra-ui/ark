import { getDocument, isShadowRoot } from '@zag-js/dom-query'
import {
  Children,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react'
import { createPortal } from 'react-dom'
import { type RootNode, useEnvironmentContext } from '../../providers'

export interface PortalProps {
  disabled?: boolean
  container?: RefObject<HTMLElement | null>
}

export const Portal = (props: PropsWithChildren<PortalProps>) => {
  const { children, disabled } = props
  const [container, setContainer] = useState(props.container?.current)
  const isServer = useSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  )
  const { getRootNode } = useEnvironmentContext()

  useEffect(() => {
    setContainer(() => props.container?.current)
  }, [props.container])

  if (isServer || disabled) return <>{children}</>

  const mountNode = container ?? getPortalNode(getRootNode)
  return <>{Children.map(children, (child) => createPortal(child, mountNode))}</>
}

const getPortalNode = (cb: () => RootNode) => {
  const node = cb?.()
  const rootNode = node.getRootNode()
  if (isShadowRoot(rootNode)) return rootNode
  return getDocument(node).body
}

const subscribe = () => () => {}
