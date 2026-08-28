export type {
  DrawDetails as SignaturePadDrawDetails,
  DrawEndDetails as SignaturePadDrawEndDetails,
  DrawingOptions as SignaturePadDrawingOptions,
} from '@zag-js/signature-pad'
export {
  SignaturePadClearTrigger,
  type SignaturePadClearTriggerBaseProps,
  type SignaturePadClearTriggerProps,
} from './signature-pad-clear-trigger.tsx'
export { SignaturePadContext, type SignaturePadContextProps } from './signature-pad-context.tsx'
export {
  SignaturePadControl,
  type SignaturePadControlBaseProps,
  type SignaturePadControlProps,
} from './signature-pad-control.tsx'
export {
  SignaturePadGuide,
  type SignaturePadGuideBaseProps,
  type SignaturePadGuideProps,
} from './signature-pad-guide.tsx'
export {
  SignaturePadHiddenInput,
  type SignaturePadHiddenInputBaseProps,
  type SignaturePadHiddenInputProps,
} from './signature-pad-hidden-input.tsx'
export {
  SignaturePadLabel,
  type SignaturePadLabelBaseProps,
  type SignaturePadLabelProps,
} from './signature-pad-label.tsx'
export { SignaturePadRoot, type SignaturePadRootBaseProps, type SignaturePadRootProps } from './signature-pad-root.tsx'
export {
  SignaturePadRootProvider,
  type SignaturePadRootProviderBaseProps,
  type SignaturePadRootProviderProps,
} from './signature-pad-root-provider.tsx'
export {
  SignaturePadSegment,
  type SignaturePadSegmentBaseProps,
  type SignaturePadSegmentProps,
} from './signature-pad-segment.tsx'
export { signaturePadAnatomy } from './signature-pad.anatomy.ts'
export { useSignaturePad, type UseSignaturePadProps, type UseSignaturePadReturn } from './use-signature-pad.ts'
export { useSignaturePadContext, type UseSignaturePadContext } from './use-signature-pad-context.ts'

export * as SignaturePad from './signature-pad.ts'
