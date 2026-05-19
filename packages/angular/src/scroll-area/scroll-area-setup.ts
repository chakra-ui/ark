import { type DestroyRef, afterNextRender } from '@angular/core'
import type { UseScrollAreaReturn } from './use-scroll-area'

type Cleanup = () => void

const queryPart = (root: HTMLElement, part: string, ownedBy: string, orientation?: string): HTMLElement | null => {
  const orientationSelector = orientation ? `[data-orientation="${orientation}"]` : ''
  return root.querySelector<HTMLElement>(`[data-part="${part}"]${orientationSelector}[data-ownedby="${ownedBy}"]`)
}

const measure = (scrollArea: UseScrollAreaReturn): void => {
  scrollArea.send({ type: 'thumb.measure' })
}

const getRootElement = (scrollArea: UseScrollAreaReturn): HTMLElement | null => {
  const id = (scrollArea.api().getRootProps() as { id?: string }).id
  return id ? scrollArea.service.scope.getById<HTMLElement>(id) : null
}

const observeResize = (scrollArea: UseScrollAreaReturn, root: HTMLElement): Cleanup | undefined => {
  const ResizeObserverCtor = scrollArea.service.scope.getWin().ResizeObserver
  const contentId = (scrollArea.api().getContentProps() as { id?: string }).id
  const content = contentId ? scrollArea.service.scope.getById<HTMLElement>(contentId) : null
  if (!ResizeObserverCtor || !content) return undefined

  const observer = new ResizeObserverCtor(() => {
    window.setTimeout(() => measure(scrollArea), 1)
  })
  observer.observe(content)
  observer.observe(root)
  return () => observer.disconnect()
}

const observeViewport = (scrollArea: UseScrollAreaReturn): Cleanup | undefined => {
  const IntersectionObserverCtor = scrollArea.service.scope.getWin().IntersectionObserver
  const viewportId = (scrollArea.api().getViewportProps() as { id?: string }).id
  const viewport = viewportId ? scrollArea.service.scope.getById<HTMLElement>(viewportId) : null
  if (!IntersectionObserverCtor || !viewport) return undefined

  const observer = new IntersectionObserverCtor((entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio <= 0) continue
      measure(scrollArea)
      observer.disconnect()
      break
    }
  })
  observer.observe(viewport)
  return () => observer.disconnect()
}

const addWheelListener = (
  scrollArea: UseScrollAreaReturn,
  root: HTMLElement,
  orientation: 'horizontal' | 'vertical',
) => {
  const rootId = (scrollArea.api().getRootProps() as { id?: string }).id
  if (!rootId) return undefined
  const scrollbar = queryPart(root, 'scrollbar', rootId, orientation)
  if (!scrollbar) return undefined

  const listener = (event: WheelEvent) => {
    const viewportId = (scrollArea.api().getViewportProps() as { id?: string }).id
    const viewport = viewportId ? scrollArea.service.scope.getById<HTMLElement>(viewportId) : null
    if (!viewport || event.ctrlKey) return
    if (orientation === 'vertical' && event.deltaY !== 0) viewport.scrollTop += event.deltaY
    if (orientation === 'horizontal' && event.deltaX !== 0) viewport.scrollLeft += event.deltaX
  }

  scrollbar.addEventListener('wheel', listener, { passive: false })
  return () => scrollbar.removeEventListener('wheel', listener)
}

export function setupScrollAreaDomEffects(scrollArea: UseScrollAreaReturn, destroyRef: DestroyRef): void {
  const cleanups: Cleanup[] = []
  let destroyed = false

  destroyRef.onDestroy(() => {
    destroyed = true
    for (const cleanup of cleanups.splice(0)) cleanup()
  })

  afterNextRender(() => {
    if (destroyed) return
    const root = getRootElement(scrollArea)
    if (!root) return

    measure(scrollArea)
    for (const cleanup of [
      observeResize(scrollArea, root),
      observeViewport(scrollArea),
      addWheelListener(scrollArea, root, 'vertical'),
      addWheelListener(scrollArea, root, 'horizontal'),
    ]) {
      if (cleanup) cleanups.push(cleanup)
    }
  })
}
