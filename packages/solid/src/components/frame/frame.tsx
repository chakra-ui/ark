import type { JSX } from '@solidjs/web'
import { Show, createEffect, createMemo, createSignal } from 'solid-js'
import { splitProps } from '../../utils/split-props.ts'
import { Portal } from '@solidjs/web'
import { EnvironmentProvider } from '../../providers/index.tsx'
import type { Assign } from '../../types.ts'
import { composeRefs } from '../../utils/compose-refs.ts'
import { ark } from '../factory.tsx'
import { FrameContent } from './frame-content.tsx'

export interface FrameBaseProps {
  /** Additional content to be inserted into the frame's <head> */
  head?: JSX.Element
  /** Callback function to be executed when the frame is mounted */
  onMount?: () => void
  /** Callback function to be executed when the frame is unmounted */
  onUnmount?: () => void
}

export interface FrameProps extends Assign<JSX.IframeHTMLAttributes<HTMLIFrameElement>, FrameBaseProps> {}

const resetStyle = '<style>*,*::before,*::after { margin: 0; padding: 0; box-sizing: border-box; }</style>'

const initialSrcDoc = `<html><head>${resetStyle}</head><body><div class="frame-root"></div></body></html>`

function getMountNode(frame: HTMLIFrameElement) {
  const doc = frame.contentWindow?.document
  if (!doc) return null
  return doc.body.querySelector<HTMLElement>('.frame-root') || doc.body
}

export const Frame = (props: FrameProps) => {
  const [frameProps, localProps] = splitProps(props, ['children', 'head', 'onMount', 'onUnmount', 'srcdoc'])

  const srcdoc = createMemo(() => frameProps.srcdoc || initialSrcDoc)

  // set from the ref callback, which runs during render
  const [frameRef, setFrameRef] = createSignal<HTMLIFrameElement | null>(null, { ownedWrite: true })
  const [mountNode, setMountNode] = createSignal<HTMLElement | null>(null)

  createEffect(
    () => [frameRef(), srcdoc()] as const,
    ([frame, html]) => {
      if (!frame) return

      const doc = frame.contentWindow?.document
      if (!doc) return

      doc.open()
      doc.write(html)
      doc.close()

      setMountNode(getMountNode(frame))
    },
  )

  createEffect(
    () => [frameRef(), mountNode()] as const,
    ([frame]) => {
      if (!frame?.contentDocument) return

      const win = frame.contentWindow as Window & typeof globalThis
      if (!win) return

      const node = getMountNode(frame)
      if (!node) return

      const exec = () => {
        win.requestAnimationFrame(() => {
          const rootEl = frame.contentDocument?.documentElement
          if (!rootEl) return
          frame.style.setProperty('--width', `${node.scrollWidth}px`)
          frame.style.setProperty('--height', `${node.scrollHeight}px`)
        })
      }

      const resizeObserver = new win.ResizeObserver(exec)
      exec()

      if (frame.contentDocument) {
        resizeObserver.observe(node)
      }

      return () => resizeObserver.disconnect()
    },
  )

  return (
    <EnvironmentProvider value={() => frameRef()?.contentDocument ?? document}>
      <ark.iframe {...localProps} ref={composeRefs(setFrameRef, localProps.ref)}>
        <Show when={mountNode()}>
          {(node) => (
            <Portal mount={node()}>
              <FrameContent onMount={frameProps.onMount} onUnmount={frameProps.onUnmount}>
                {frameProps.children}
              </FrameContent>
            </Portal>
          )}
        </Show>
        <Show when={mountNode()}>
          <Portal mount={frameRef()!.contentDocument!.head}>{frameProps.head}</Portal>
        </Show>
      </ark.iframe>
    </EnvironmentProvider>
  )
}
