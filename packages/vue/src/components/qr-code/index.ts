export type { QrCodeGenerateOptions, QrCodeGenerateResult } from '@zag-js/qr-code'
export { default as QrCodeContext, type QrCodeContextProps } from './qr-code-context.vue'
export {
  default as QrCodeFrame,
  type QrCodeFrameProps,
  type QrCodeFrameBaseProps,
} from './qr-code-frame.vue'
export {
  default as QrCodeOverlay,
  type QrCodeOverlayProps,
  type QrCodeOverlayBaseProps,
} from './qr-code-overlay.vue'
export {
  default as QrCodePattern,
  type QrCodePatternProps,
  type QrCodePatternBaseProps,
} from './qr-code-pattern.vue'
export {
  default as QrCodeRootProvider,
  type QrCodeRootProviderProps,
  type QrCodeRootProviderBaseProps,
} from './qr-code-root-provider.vue'
export {
  default as QrCodeRoot,
  type QrCodeRootProps,
  type QrCodeRootBaseProps,
} from './qr-code-root.vue'
export { useQrCode, type UseQrCodeProps, type UseQrCodeReturn } from './use-qr-code'
export { useQrCodeContext, type UseQrCodeContext } from './use-qr-code-context'
export { qrCodeAnatomy } from './qr-code.anatomy'

export * as QrCode from './qr-code'
