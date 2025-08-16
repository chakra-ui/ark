export type {
  ElementIds as ScrollAreaElementIds,
  ScrollToEdge as ScrollAreaScrollToEdge,
  ScrollbarState as ScrollAreaScrollbarState,
  ScrollToDetails as ScrollAreaScrollToDetails,
  ScrollToEdgeDetails as ScrollAreaScrollToEdgeDetails,
} from '@zag-js/scroll-area'
export { default as ScrollAreaContext, type ScrollAreaContextProps } from './scroll-area-context.vue'
export {
  default as ScrollAreaContent,
  type ScrollAreaContentBaseProps,
  type ScrollAreaContentProps,
} from './scroll-area-content.vue'
export {
  default as ScrollAreaCorner,
  type ScrollAreaCornerBaseProps,
  type ScrollAreaCornerProps,
} from './scroll-area-corner.vue'
export {
  default as ScrollAreaRoot,
  type ScrollAreaRootBaseProps,
  type ScrollAreaRootEmits,
  type ScrollAreaRootProps,
} from './scroll-area-root.vue'
export {
  default as ScrollAreaRootProvider,
  type ScrollAreaRootProviderBaseProps,
  type ScrollAreaRootProviderProps,
} from './scroll-area-root-provider.vue'
export {
  default as ScrollAreaScrollbar,
  type ScrollAreaScrollbarBaseProps,
  type ScrollAreaScrollbarProps,
} from './scroll-area-scrollbar.vue'
export {
  default as ScrollAreaThumb,
  type ScrollAreaThumbBaseProps,
  type ScrollAreaThumbProps,
} from './scroll-area-thumb.vue'
export {
  default as ScrollAreaViewport,
  type ScrollAreaViewportBaseProps,
  type ScrollAreaViewportProps,
} from './scroll-area-viewport.vue'
export { scrollAreaAnatomy } from './scroll-area.anatomy'
export { useScrollArea, type UseScrollAreaProps, type UseScrollAreaReturn } from './use-scroll-area'
export { useScrollAreaContext, type UseScrollAreaContext } from './use-scroll-area-context'

export * as ScrollArea from './scroll-area'
