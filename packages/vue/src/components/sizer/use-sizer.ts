import { type ComputedRef, type MaybeRef, type VNodeRef, computed, ref, toValue, watch } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../../providers'
import type { EmitFn } from '../../types'
import type { RootEmits } from './sizer.types'

export interface Size {
  width: number
  height: number
}

export interface SizerResizeDetails extends Size {}

export interface UseSizerProps {
  onSizeChange?: (details: SizerResizeDetails) => void
}

export type UseSizerReturn = ComputedRef<{
  rootRef: VNodeRef
  contentRef: VNodeRef
}>

const fuzzyEqual = (a: number, b: number, tolerance = 0.1): boolean => {
  return Math.abs(a - b) <= tolerance
}

export const useSizer = (props: MaybeRef<UseSizerProps> = {}, emit?: EmitFn<RootEmits>): UseSizerReturn => {
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const rootRef = ref<VNodeRef | null>(null)
  const contentRef = ref<VNodeRef | null>(null)
  let lastDimensions: Size | undefined
  let animationFrameId: number | undefined

  watch([rootRef, contentRef], ([newRoot, newContent], _, onCleanup) => {
    const root = newRoot?.$el || newRoot
    const content = newContent?.$el || newContent

    if (!root || !content) return

    const win = env.value.getWindow()

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
          const localProps = toValue(props)
          localProps.onSizeChange?.({ width, height })
          emit?.('sizeChange', { width, height })
        }
      })
    })

    resizeObserver.observe(content)

    onCleanup(() => {
      if (animationFrameId !== undefined) {
        win.cancelAnimationFrame(animationFrameId)
      }
      resizeObserver.disconnect()
    })
  })

  return computed(() => ({
    rootRef,
    contentRef,
  }))
}
