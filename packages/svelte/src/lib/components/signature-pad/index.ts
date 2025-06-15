export type {
  DrawDetails as SignaturePadDrawDetails,
  DrawEndDetails as SignaturePadDrawEndDetails,
  DrawingOptions as SignaturePadDrawingOptions,
} from '@zag-js/signature-pad'
export {
  default as SignaturePadClearTrigger,
  type SignaturePadClearTriggerBaseProps,
  type SignaturePadClearTriggerProps,
} from './signature-pad-clear-trigger.svelte'
export { default as SignaturePadContext, type SignaturePadContextProps } from './signature-pad-context.svelte'
export {
  default as SignaturePadControl,
  type SignaturePadControlBaseProps,
  type SignaturePadControlProps,
} from './signature-pad-control.svelte'
export {
  default as SignaturePadGuide,
  type SignaturePadGuideBaseProps,
  type SignaturePadGuideProps,
} from './signature-pad-guide.svelte'
export {
  default as SignaturePadHiddenInput,
  type SignaturePadHiddenInputBaseProps,
  type SignaturePadHiddenInputProps,
} from './signature-pad-hidden-input.svelte'
export {
  default as SignaturePadLabel,
  type SignaturePadLabelBaseProps,
  type SignaturePadLabelProps,
} from './signature-pad-label.svelte'
export {
  default as SignaturePadRoot,
  type SignaturePadRootBaseProps,
  type SignaturePadRootProps,
} from './signature-pad-root.svelte'
export {
  default as SignaturePadRootProvider,
  type SignaturePadRootProviderBaseProps,
  type SignaturePadRootProviderProps,
} from './signature-pad-root-provider.svelte'
export {
  default as SignaturePadSegment,
  type SignaturePadSegmentBaseProps,
  type SignaturePadSegmentProps,
} from './signature-pad-segment.svelte'
export { signaturePadAnatomy } from './signature-pad.anatomy'
export { useSignaturePad, type UseSignaturePadProps, type UseSignaturePadReturn } from './use-signature-pad.svelte'
export { useSignaturePadContext, type UseSignaturePadContext } from './use-signature-pad-context'

export * as SignaturePad from './signature-pad'
