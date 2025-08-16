export type {
  ElementIds as ScrollAreaElementIds,
  ScrollToEdge as ScrollAreaScrollToEdge,
  ScrollbarState as ScrollAreaScrollbarState,
  ScrollToDetails as ScrollAreaScrollToDetails,
  ScrollToEdgeDetails as ScrollAreaScrollToEdgeDetails,
} from '@zag-js/scroll-area'
export { ScrollAreaContext, type ScrollAreaContextProps } from './scroll-area-context'
export { ScrollAreaContent, type ScrollAreaContentBaseProps, type ScrollAreaContentProps } from './scroll-area-content'
export { ScrollAreaCorner, type ScrollAreaCornerBaseProps, type ScrollAreaCornerProps } from './scroll-area-corner'
export { ScrollAreaRoot, type ScrollAreaRootBaseProps, type ScrollAreaRootProps } from './scroll-area-root'
export {
  ScrollAreaRootProvider,
  type ScrollAreaRootProviderBaseProps,
  type ScrollAreaRootProviderProps,
} from './scroll-area-root-provider'
export {
  ScrollAreaScrollbar,
  type ScrollAreaScrollbarBaseProps,
  type ScrollAreaScrollbarProps,
} from './scroll-area-scrollbar'
export { ScrollAreaThumb, type ScrollAreaThumbBaseProps, type ScrollAreaThumbProps } from './scroll-area-thumb'
export {
  ScrollAreaViewport,
  type ScrollAreaViewportBaseProps,
  type ScrollAreaViewportProps,
} from './scroll-area-viewport'
export { scrollAreaAnatomy } from './scroll-area.anatomy'
export { useScrollArea, type UseScrollAreaProps, type UseScrollAreaReturn } from './use-scroll-area'
export { useScrollAreaContext, type UseScrollAreaContext } from './use-scroll-area-context'

export * as ScrollArea from './scroll-area'
