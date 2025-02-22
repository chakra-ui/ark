import { forwardRef, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { EnvironmentProvider } from '../../providers'
import type { Assign } from '../../types'
import { composeRefs } from '../../utils/compose-refs'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import { FrameContent } from './frame-content'

export interface FrameBaseProps {
  /** Additional content to be inserted into the frame's <head> */
  head?: React.ReactNode
  /** Callback function to be executed when the frame is mounted */
  onMount?: () => void
  /** Callback function to be executed when the frame is unmounted */
  onUnmount?: () => void
}

export interface FrameProps extends Assign<React.IframeHTMLAttributes<HTMLIFrameElement>, FrameBaseProps> {}

const resetStyle = '<style>*,*::before,*::after { margin: 0; padding: 0; box-sizing: border-box; }</style>'

const initialSrcDoc = `<html><head>${resetStyle}</head><body><div class="frame-root"></div></body></html>`

function getMountNode(frame: HTMLIFrameElement) {
  const doc = frame.contentWindow?.document
  if (!doc) return null
  const mountNode = doc.body.querySelector<HTMLElement>('.frame-root') || doc.body
  return mountNode
}

export const Frame = forwardRef<HTMLIFrameElement, FrameProps>((props, ref) => {
  const { children, head, onMount, onUnmount, srcDoc = initialSrcDoc, ...rest } = props

  const [frameRef, setFrameRef] = useState<HTMLIFrameElement | null>(null)
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null)

  useSafeLayoutEffect(() => {
    if (!frameRef) return

    const doc = frameRef.contentWindow?.document
    if (!doc) return

    doc.open()
    doc.write(srcDoc)
    doc.close()

    setMountNode(getMountNode(frameRef))
  }, [frameRef, srcDoc])

  useEffect(() => {
    if (!frameRef || !frameRef.contentDocument) return

    const win = frameRef.contentWindow as Window & typeof globalThis
    if (!win) return

    const mountNode = getMountNode(frameRef)
    if (!mountNode) return

    const exec = () => {
      const rootEl = frameRef.contentDocument?.documentElement
      if (!rootEl) return
      frameRef.style.setProperty('--width', `${mountNode.scrollWidth}px`)
      frameRef.style.setProperty('--height', `${mountNode.scrollHeight}px`)
    }

    const resizeObserver = new win.ResizeObserver(exec)
    exec()

    if (frameRef.contentDocument) {
      resizeObserver.observe(mountNode)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [frameRef])

  return (
    <EnvironmentProvider value={() => frameRef?.contentDocument ?? document}>
      <iframe title={`frame:${useId()}`} ref={composeRefs<HTMLIFrameElement>(ref, setFrameRef)} {...rest}>
        {mountNode
          ? createPortal(
              <FrameContent onMount={onMount} onUnmount={onUnmount}>
                {children}
              </FrameContent>,
              mountNode,
            )
          : null}
        {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
        {head && frameRef ? createPortal(head, frameRef.contentDocument!.head) : null}
      </iframe>
    </EnvironmentProvider>
  )
})
