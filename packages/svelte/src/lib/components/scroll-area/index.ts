export type {
  ElementIds as ScrollAreaElementIds,
  ScrollToEdge as ScrollAreaScrollToEdge,
  ScrollbarState as ScrollAreaScrollbarState,
  ScrollToDetails as ScrollAreaScrollToDetails,
  ScrollToEdgeDetails as ScrollAreaScrollToEdgeDetails,
} from '@zag-js/scroll-area'
export {
  default as ScrollAreaContent,
  type ScrollAreaContentBaseProps,
  type ScrollAreaContentProps,
} from './scroll-area-content.svelte'
export { default as ScrollAreaContext, type ScrollAreaContextProps } from './scroll-area-context.svelte'
export {
  default as ScrollAreaCorner,
  type ScrollAreaCornerBaseProps,
  type ScrollAreaCornerProps,
} from './scroll-area-corner.svelte'
export {
  default as ScrollAreaRoot,
  type ScrollAreaRootBaseProps,
  type ScrollAreaRootProps,
} from './scroll-area-root.svelte'
export {
  default as ScrollAreaRootProvider,
  type ScrollAreaRootProviderBaseProps,
  type ScrollAreaRootProviderProps,
} from './scroll-area-root-provider.svelte'
export {
  default as ScrollAreaScrollbar,
  type ScrollAreaScrollbarBaseProps,
  type ScrollAreaScrollbarProps,
} from './scroll-area-scrollbar.svelte'
export {
  default as ScrollAreaThumb,
  type ScrollAreaThumbBaseProps,
  type ScrollAreaThumbProps,
} from './scroll-area-thumb.svelte'
export {
  default as ScrollAreaViewport,
  type ScrollAreaViewportBaseProps,
  type ScrollAreaViewportProps,
} from './scroll-area-viewport.svelte'
export { scrollAreaAnatomy } from './scroll-area.anatomy.js'
export { useScrollArea, type UseScrollAreaProps, type UseScrollAreaReturn } from './use-scroll-area.svelte.js'
export { useScrollAreaContext, type UseScrollAreaContext } from './use-scroll-area-context.js'

export * as ScrollArea from './scroll-area.js'
