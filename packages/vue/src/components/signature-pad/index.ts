export type {
  DrawDetails as SignaturePadDrawDetails,
  DrawEndDetails as SignaturePadDrawEndDetails,
  DrawingOptions as SignaturePadDrawingOptions,
} from '@zag-js/signature-pad'
export {
  default as SignaturePadClearTrigger,
  type SignaturePadClearTriggerProps,
} from './signature-pad-clear-trigger.vue'
export {
  default as SignaturePadContext,
  type SignaturePadContextProps,
} from './signature-pad-context.vue'
export {
  default as SignaturePadControl,
  type SignaturePadControlProps,
} from './signature-pad-control.vue'
export {
  default as SignaturePadGuide,
  type SignaturePadGuideProps,
} from './signature-pad-guide.vue'
export {
  default as SignaturePadLabel,
  type SignaturePadLabelProps,
} from './signature-pad-label.vue'
export {
  default as SignaturePadRootProvider,
  type SignaturePadRootProviderProps,
} from './signature-pad-root-provider.vue'
export { default as SignaturePadRoot, type SignaturePadRootProps } from './signature-pad-root.vue'
export {
  default as SignaturePadSegment,
  type SignaturePadSegmentProps,
} from './signature-pad-segment.vue'
export {
  useSignaturePad,
  type UseSignaturePadProps,
  type UseSignaturePadReturn,
} from './use-signature-pad'
export { useSignaturePadContext, type UseSignaturePadContext } from './use-signature-pad-context'

export * as SignaturePad from './signature-pad'
