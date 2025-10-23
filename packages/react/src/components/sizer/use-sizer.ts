import type { Size } from '@zag-js/types'
import { useEffect, useRef } from 'react'
import { useEnvironmentContext } from '../../providers'
import { useEvent } from '../../utils/use-event'

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
  rootRef: React.RefObject<HTMLDivElement | null>
  /**
   * The content element of the sizer.
   */
  contentRef: React.RefObject<HTMLDivElement | null>
}

export const useSizer = (props: UseSizerProps = {}): UseSizerReturn => {
  const { onSizeChange: onSizeChangeProp } = props

  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastDimensionsRef = useRef<Size | undefined>(undefined)

  const env = useEnvironmentContext()
  const onSizeChange = useEvent(onSizeChangeProp)

  useEffect(() => {
    if (!contentRef.current || !rootRef.current) return

    const contentEl = contentRef.current
    const rootEl = rootRef.current
    const win = env.getWindow()

    const observer = new win.ResizeObserver((entries) => {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        win.cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = win.requestAnimationFrame(() => {
        const [entry] = entries
        if (!entry) return

        const { width, height } = entry.contentRect

        // Only update if dimensions actually changed
        const lastDimensions = lastDimensionsRef.current
        if (!lastDimensions || !fuzzyEqual(lastDimensions.width, width) || !fuzzyEqual(lastDimensions.height, height)) {
          rootEl.style.setProperty('--sizer-width', `${width.toFixed(1)}px`)
          rootEl.style.setProperty('--sizer-height', `${height.toFixed(1)}px`)

          lastDimensionsRef.current = { width, height }
          onSizeChange?.({ width, height })
        }
      })
    })

    observer.observe(contentEl)

    return () => {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        win.cancelAnimationFrame(animationFrameRef.current)
      }
      observer.disconnect()
    }
  }, [env, onSizeChange])

  return { rootRef, contentRef }
}
