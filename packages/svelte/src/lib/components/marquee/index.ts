export type { PauseStatusDetails as MarqueePauseStatusDetails, Side as MarqueeSide } from '@zag-js/marquee'
export {
  default as MarqueeContent,
  type MarqueeContentBaseProps,
  type MarqueeContentProps,
} from './marquee-content.svelte'
export { default as MarqueeContext, type MarqueeContextProps } from './marquee-context.svelte'
export { default as MarqueeEdge, type MarqueeEdgeBaseProps, type MarqueeEdgeProps } from './marquee-edge.svelte'
export { default as MarqueeRoot, type MarqueeRootBaseProps, type MarqueeRootProps } from './marquee-root.svelte'
export {
  default as MarqueeRootProvider,
  type MarqueeRootProviderBaseProps,
  type MarqueeRootProviderProps,
} from './marquee-root-provider.svelte'
export {
  default as MarqueeViewport,
  type MarqueeViewportBaseProps,
  type MarqueeViewportProps,
} from './marquee-viewport.svelte'
export { marqueeAnatomy } from './marquee.anatomy'
export { useMarquee, type UseMarqueeProps, type UseMarqueeReturn } from './use-marquee.svelte'
export { useMarqueeContext, type UseMarqueeContext } from './use-marquee-context'

export * as Marquee from './marquee'
