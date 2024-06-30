export type {
  DrawDetails as SignaturePadDrawDetails,
  DrawEndDetails as SignaturePadDrawEndDetails,
  DrawingOptions as SignaturePadDrawingOptions,
} from '@zag-js/signature-pad'
export {
  default as SignaturePadClearTrigger,
  type SignaturePadClearTriggerProps,
  type SignaturePadClearTriggerBaseProps,
} from './signature-pad-clear-trigger.vue'
export {
  default as SignaturePadContext,
  type SignaturePadContextProps,
} from './signature-pad-context.vue'
export {
  default as SignaturePadHiddenInput,
  type SignaturePadHiddenInputProps,
  type SignaturePadHiddenInputBaseProps,
} from './signature-pad-hidden-input.vue'
export {
  default as SignaturePadControl,
  type SignaturePadControlProps,
  type SignaturePadControlBaseProps,
} from './signature-pad-control.vue'
export {
  default as SignaturePadGuide,
  type SignaturePadGuideProps,
  type SignaturePadGuideBaseProps,
} from './signature-pad-guide.vue'
export {
  default as SignaturePadLabel,
  type SignaturePadLabelProps,
  type SignaturePadLabelBaseProps,
} from './signature-pad-label.vue'
export {
  default as SignaturePadRootProvider,
  type SignaturePadRootProviderProps,
  type SignaturePadRootProviderBaseProps,
} from './signature-pad-root-provider.vue'
export {
  default as SignaturePadRoot,
  type SignaturePadRootProps,
  type SignaturePadRootBaseProps,
} from './signature-pad-root.vue'
export {
  default as SignaturePadSegment,
  type SignaturePadSegmentProps,
  type SignaturePadSegmentBaseProps,
} from './signature-pad-segment.vue'
export {
  useSignaturePad,
  type UseSignaturePadProps,
  type UseSignaturePadReturn,
} from './use-signature-pad'
export { useSignaturePadContext, type UseSignaturePadContext } from './use-signature-pad-context'
export { signaturePadAnatomy } from './signature-pad.anatomy'

export * as SignaturePad from './signature-pad'
