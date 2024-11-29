export type { QrCodeGenerateOptions, QrCodeGenerateResult } from '@zag-js/qr-code'
export {
  default as QrCodeRoot,
  type QrCodeRootProps,
  type QrCodeRootBaseProps,
} from './qr-code-root.svelte'
export {
  default as QrCodeFrame,
  type QrCodeFrameProps,
  type QrCodeFrameBaseProps,
} from './qr-code-frame.svelte'
export {
  default as QrCodePattern,
  type QrCodePatternProps,
  type QrCodePatternBaseProps,
} from './qr-code-pattern.svelte'
export {
  default as QrCodeOverlay,
  type QrCodeOverlayProps,
  type QrCodeOverlayBaseProps,
} from './qr-code-overlay.svelte'
export {
  default as QrCodeRootProvider,
  type QrCodeRootProviderProps,
  type QrCodeRootProviderBaseProps,
} from './qr-code-root-provider.svelte'
export {
  default as QrCodeContext,
  type QrCodeContextProps,
} from './qr-code-context.svelte'
export { qrCodeAnatomy } from './qr-code.anatomy'
export { useQrCodeContext, type UseQrCodeContext } from './use-qr-code-context'
export { useQrCode, type UseQrCodeProps, type UseQrCodeReturn } from './use-qr-code.svelte'

export * as QrCode from './qr-code'
