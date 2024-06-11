export type {
  QrCodeGenerateOptions as GenerateOptions,
  QrCodeGenerateResult as GenerateResult,
} from '@zag-js/qr-code'
export { default, type QrCodeContextProps } from './qr-code-context.vue'
export { default as Frame, type QrCodeFrameProps as FrameProps } from './qr-code-frame.vue'
export {
  default as Overlay,
  type QrCodeOverlayProps as OverlayProps,
} from './qr-code-overlay.vue'
export {
  default as Pattern,
  type QrCodePatternProps as PatternProps,
} from './qr-code-pattern.vue'
export { default as Root, type QrCodeRootProps as RootProps } from './qr-code-root.vue'
export {
  default as RootProvider,
  type QrCodeRootProviderProps as RootProviderProps,
} from './qr-code-root-provider.vue'
