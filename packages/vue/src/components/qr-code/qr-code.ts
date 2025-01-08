export type {
  QrCodeGenerateOptions as GenerateOptions,
  QrCodeGenerateResult as GenerateResult,
} from '@zag-js/qr-code'
export { default, type QrCodeContextProps } from './qr-code-context.vue'
export {
  default as DownloadTrigger,
  type QrCodeDownloadTriggerBaseProps as DownloadTriggerBaseProps,
  type QrCodeDownloadTriggerProps as DownloadTriggerProps,
} from './qr-code-download-trigger.vue'
export {
  default as Frame,
  type QrCodeFrameBaseProps as FrameBaseProps,
  type QrCodeFrameProps as FrameProps,
} from './qr-code-frame.vue'
export {
  default as Overlay,
  type QrCodeOverlayBaseProps as OverlayBaseProps,
  type QrCodeOverlayProps as OverlayProps,
} from './qr-code-overlay.vue'
export {
  default as Pattern,
  type QrCodePatternBaseProps as PatternBaseProps,
  type QrCodePatternProps as PatternProps,
} from './qr-code-pattern.vue'
export {
  default as RootProvider,
  type QrCodeRootProviderBaseProps as RootProviderBaseProps,
  type QrCodeRootProviderProps as RootProviderProps,
} from './qr-code-root-provider.vue'
export {
  default as Root,
  type QrCodeRootBaseProps as RootBaseProps,
  type QrCodeRootEmits as RootEmits,
  type QrCodeRootProps as RootProps,
} from './qr-code-root.vue'
