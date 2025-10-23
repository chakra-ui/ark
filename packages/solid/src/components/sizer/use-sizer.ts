import type { Size } from '@zag-js/types'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { MaybeAccessor } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface SizerResizeDetails extends Size {}

const fuzzyEqual = (a: number, b: number, tolerance = 0.1): boolean => {
  return Math.abs(a - b) <= tolerance
}

export interface UseSizerProps {
  /**
   * The callback function to call when the content is resized.
   */
  onSizeChange?: ((details: SizerResizeDetails) => void) | undefined
}

export interface UseSizerReturn {
  /**
   * The root element of the sizer.
   */
  rootRef: (node: HTMLDivElement | null) => void
  /**
   * The content element of the sizer.
   */
  contentRef: (node: HTMLDivElement | null) => void
}

export const useSizer = (props: MaybeAccessor<UseSizerProps> = {}): Accessor<UseSizerReturn> => {
  const [rootEl, setRootEl] = createSignal<HTMLDivElement | null>(null)
  const [contentEl, setContentEl] = createSignal<HTMLDivElement | null>(null)

  const environment = useEnvironmentContext()

  createEffect(() => {
    const content = contentEl()
    const root = rootEl()
    const { onSizeChange } = runIfFn(props)

    if (!content || !root) return

    const win = environment().getWindow()
    let animationFrame: number | undefined
    let lastDimensions: Size | undefined

    const observer = new win.ResizeObserver((entries) => {
      // Cancel any pending animation frame
      if (animationFrame) {
        win.cancelAnimationFrame(animationFrame)
      }

      animationFrame = win.requestAnimationFrame(() => {
        const [entry] = entries
        if (!entry) return

        const { width, height } = entry.contentRect

        // Only update if dimensions actually changed
        if (!lastDimensions || !fuzzyEqual(lastDimensions.width, width) || !fuzzyEqual(lastDimensions.height, height)) {
          root.style.setProperty('--sizer-width', `${width.toFixed(1)}px`)
          root.style.setProperty('--sizer-height', `${height.toFixed(1)}px`)

          lastDimensions = { width, height }
          onSizeChange?.({ width, height })
        }
      })
    })

    observer.observe(content)

    onCleanup(() => {
      if (animationFrame) {
        win.cancelAnimationFrame(animationFrame)
      }
      observer.disconnect()
    })
  })

  return () => ({
    rootRef: setRootEl,
    contentRef: setContentEl,
  })
}
