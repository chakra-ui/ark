<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLIframeAttributes } from 'svelte/elements'

  import type { Assign } from '../../types'

  export interface FrameBaseProps {
    /** Additional content to be inserted into the frame's <head> */
    head?: Snippet
    /** Callback function to be executed when the frame is mounted */
    onMount?: () => void
    /** Callback function to be executed when the frame is unmounted */
    onUnmount?: () => void
    srcdoc?: string
    ref?: HTMLIFrameElement
  }
  export interface FrameProps extends Assign<HTMLIframeAttributes, FrameBaseProps> {}

  const CUSTOM_ROOT_CLASS = 'frame-root'
  const resetStyle =
    '<style>*,*::before,*::after { margin: 0; padding: 0; box-sizing: border-box; }</style>'
  const initialSrcDoc = `<html><head>${resetStyle}</head><body><div class="${CUSTOM_ROOT_CLASS}"></div></body></html>`

  function getMountNode(frame: HTMLIFrameElement) {
    const doc = frame.contentWindow?.document
    if (!doc) return null
    return doc.body.querySelector<HTMLElement>(`.${CUSTOM_ROOT_CLASS}`) || doc.body
  }
</script>

<script lang="ts">
  import { EnvironmentProvider } from '@ark-ui/svelte/environment'

  import Portal from '$lib/components/portal/portal.svelte'

  import FrameContent from './frame-content.svelte'

  let { head, onMount, onUnmount, srcdoc, ref = $bindable(), ...localProps }: FrameProps = $props()

  let frameRef: HTMLIFrameElement | undefined = $state()
  let mountNode: HTMLElement | null = $derived(frameRef ? getMountNode(frameRef) : null)

  $effect(() => {
    if (!frameRef) return

    const doc = frameRef.contentWindow?.document
    if (!doc) return

    doc.open()
    doc.write(srcdoc ?? initialSrcDoc)
    doc.close()
  })

  $effect(() => {
    if (!frameRef || !frameRef.contentDocument) return

    const win = frameRef.contentWindow as Window & typeof globalThis

    if (!win || !mountNode) return

    const exec = () => {
      if (!(mountNode && frameRef && frameRef.contentDocument)) return

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
  })
</script>

<iframe bind:this={frameRef} bind:this={ref} {...localProps}>
  <EnvironmentProvider value={() => frameRef?.contentDocument ?? document}>
    {#if mountNode}
      <Portal container={mountNode}>
        <FrameContent {onMount} {onUnmount}>
          {#if localProps?.children}
            {@render localProps.children()}
          {/if}
        </FrameContent>
      </Portal>
    {/if}
    {#if mountNode && head && frameRef?.contentDocument?.head}
      <Portal container={frameRef.contentDocument.head}>
        {@render head()}
      </Portal>
    {/if}
  </EnvironmentProvider>
</iframe>
