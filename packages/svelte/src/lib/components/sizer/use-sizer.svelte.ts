import { useEnvironmentContext } from '$lib/providers/environment'
import type { Accessor } from '$lib/types'
import type { Size } from '@zag-js/types'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface SizerResizeDetails extends Size {}

export interface UseSizerProps {
  onSizeChange?: ((details: SizerResizeDetails) => void) | undefined
}

export interface UseSizerReturn {
  setRootRef: (node: HTMLDivElement | null) => void
  setContentRef: (node: HTMLDivElement | null) => void
}

const fuzzyEqual = (a: number, b: number, tolerance = 0.1): boolean => {
  return Math.abs(a - b) <= tolerance
}

export const useSizer = (props: MaybeFunction<UseSizerProps> = {}): Accessor<UseSizerReturn> => {
  const env = useEnvironmentContext()

  let rootEl = $state<HTMLDivElement | null>(null)
  let contentEl = $state<HTMLDivElement | null>(null)
  let lastDimensions: Size | undefined

  $effect(() => {
    const content = contentEl
    const root = rootEl

    if (!content || !root) return

    const win = env().getWindow()

    let animationFrameId: number | undefined

    const { onSizeChange } = runIfFn(props)

    const resizeObserver = new win.ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      if (animationFrameId !== undefined) {
        win.cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = win.requestAnimationFrame(() => {
        const { width, height } = entry.contentRect

        if (!lastDimensions || !fuzzyEqual(lastDimensions.width, width) || !fuzzyEqual(lastDimensions.height, height)) {
          root.style.setProperty('--sizer-width', `${width.toFixed(1)}px`)
          root.style.setProperty('--sizer-height', `${height.toFixed(1)}px`)
          lastDimensions = { width, height }
          onSizeChange?.({ width, height })
        }
      })
    })

    resizeObserver.observe(content)

    return () => {
      if (animationFrameId !== undefined) {
        win.cancelAnimationFrame(animationFrameId)
      }
      resizeObserver.disconnect()
    }
  })

  return () => ({
    setRootRef: (node: HTMLDivElement | null) => {
      rootEl = node
    },
    setContentRef: (node: HTMLDivElement | null) => {
      contentEl = node
    },
  })
}
