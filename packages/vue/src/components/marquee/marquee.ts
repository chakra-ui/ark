export type { PauseStatusDetails, Side } from '@zag-js/marquee'
export {
  default as Content,
  type MarqueeContentBaseProps as ContentBaseProps,
  type MarqueeContentProps as ContentProps,
} from './marquee-content.vue'
export { default as Context, type MarqueeContextProps as ContextProps } from './marquee-context.vue'
export {
  default as Edge,
  type MarqueeEdgeBaseProps as EdgeBaseProps,
  type MarqueeEdgeProps as EdgeProps,
} from './marquee-edge.vue'
export {
  default as Root,
  type MarqueeRootBaseProps as RootBaseProps,
  type MarqueeRootEmits as RootEmits,
  type MarqueeRootProps as RootProps,
} from './marquee-root.vue'
export {
  default as RootProvider,
  type MarqueeRootProviderBaseProps as RootProviderBaseProps,
  type MarqueeRootProviderProps as RootProviderProps,
} from './marquee-root-provider.vue'
export {
  default as Viewport,
  type MarqueeViewportBaseProps as ViewportBaseProps,
  type MarqueeViewportProps as ViewportProps,
} from './marquee-viewport.vue'
