export type { PauseStatusDetails as MarqueePauseStatusDetails, Side as MarqueeSide } from '@zag-js/marquee'
export {
  default as MarqueeContent,
  type MarqueeContentBaseProps,
  type MarqueeContentProps,
} from './marquee-content.vue'
export { default as MarqueeContext } from './marquee-context.vue'
export { default as MarqueeEdge, type MarqueeEdgeBaseProps, type MarqueeEdgeProps } from './marquee-edge.vue'
export {
  default as MarqueeRoot,
  type MarqueeRootBaseProps,
  type MarqueeRootEmits,
  type MarqueeRootProps,
} from './marquee-root.vue'
export {
  default as MarqueeRootProvider,
  type MarqueeRootProviderBaseProps,
  type MarqueeRootProviderProps,
} from './marquee-root-provider.vue'
export {
  default as MarqueeViewport,
  type MarqueeViewportBaseProps,
  type MarqueeViewportProps,
} from './marquee-viewport.vue'
export { marqueeAnatomy } from './marquee.anatomy'
export { useMarquee, type UseMarqueeProps, type UseMarqueeReturn } from './use-marquee'
export { useMarqueeContext, type UseMarqueeContext } from './use-marquee-context'

export * as Marquee from './marquee'
