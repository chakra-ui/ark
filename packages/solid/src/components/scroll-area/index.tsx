export type {
  ElementIds as ScrollAreaElementIds,
  ScrollToEdge as ScrollAreaScrollToEdge,
  ScrollbarState as ScrollAreaScrollbarState,
  ScrollToDetails as ScrollAreaScrollToDetails,
  ScrollToEdgeDetails as ScrollAreaScrollToEdgeDetails,
} from '@zag-js/scroll-area'
export { ScrollAreaContext, type ScrollAreaContextProps } from './scroll-area-context.tsx'
export {
  ScrollAreaContent,
  type ScrollAreaContentBaseProps,
  type ScrollAreaContentProps,
} from './scroll-area-content.tsx'
export { ScrollAreaCorner, type ScrollAreaCornerBaseProps, type ScrollAreaCornerProps } from './scroll-area-corner.tsx'
export { ScrollAreaRoot, type ScrollAreaRootBaseProps, type ScrollAreaRootProps } from './scroll-area-root.tsx'
export {
  ScrollAreaRootProvider,
  type ScrollAreaRootProviderBaseProps,
  type ScrollAreaRootProviderProps,
} from './scroll-area-root-provider.tsx'
export {
  ScrollAreaScrollbar,
  type ScrollAreaScrollbarBaseProps,
  type ScrollAreaScrollbarProps,
} from './scroll-area-scrollbar.tsx'
export { ScrollAreaThumb, type ScrollAreaThumbBaseProps, type ScrollAreaThumbProps } from './scroll-area-thumb.tsx'
export {
  ScrollAreaViewport,
  type ScrollAreaViewportBaseProps,
  type ScrollAreaViewportProps,
} from './scroll-area-viewport.tsx'
export { scrollAreaAnatomy } from './scroll-area.anatomy.ts'
export { useScrollArea, type UseScrollAreaProps, type UseScrollAreaReturn } from './use-scroll-area.ts'
export { useScrollAreaContext, type UseScrollAreaContext } from './use-scroll-area-context.ts'

export * as ScrollArea from './scroll-area.ts'
