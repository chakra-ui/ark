export type { QrCodeGenerateOptions, QrCodeGenerateResult } from '@zag-js/qr-code'
export { default as QrCodeContext, type QrCodeContextProps } from './qr-code-context.vue'
export {
  default as QrCodeFrame,
  type QrCodeFrameBaseProps,
  type QrCodeFrameProps,
} from './qr-code-frame.vue'
export {
  default as QrCodeOverlay,
  type QrCodeOverlayBaseProps,
  type QrCodeOverlayProps,
} from './qr-code-overlay.vue'
export {
  default as QrCodePattern,
  type QrCodePatternBaseProps,
  type QrCodePatternProps,
} from './qr-code-pattern.vue'
export {
  default as QrCodeRootProvider,
  type QrCodeRootProviderBaseProps,
  type QrCodeRootProviderProps,
} from './qr-code-root-provider.vue'
export {
  default as QrCodeRoot,
  type QrCodeRootBaseProps,
  type QrCodeRootProps,
} from './qr-code-root.vue'
export { qrCodeAnatomy } from './qr-code.anatomy'
export { useQrCode, type UseQrCodeProps, type UseQrCodeReturn } from './use-qr-code'
export { useQrCodeContext, type UseQrCodeContext } from './use-qr-code-context'

export * as QrCode from './qr-code'
