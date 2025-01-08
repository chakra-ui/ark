export type { QrCodeGenerateOptions, QrCodeGenerateResult } from '@zag-js/qr-code'
export { default as QrCodeContext, type QrCodeContextProps } from './qr-code-context.svelte'
export {
  default as QrCodeDownloadTrigger,
  type QrCodeDownloadTriggerBaseProps,
  type QrCodeDownloadTriggerProps,
} from './qr-code-download-trigger.svelte'
export {
  default as QrCodeFrame,
  type QrCodeFrameBaseProps,
  type QrCodeFrameProps,
} from './qr-code-frame.svelte'
export {
  default as QrCodeOverlay,
  type QrCodeOverlayBaseProps,
  type QrCodeOverlayProps,
} from './qr-code-overlay.svelte'
export {
  default as QrCodePattern,
  type QrCodePatternBaseProps,
  type QrCodePatternProps,
} from './qr-code-pattern.svelte'
export {
  default as QrCodeRootProvider,
  type QrCodeRootProviderBaseProps,
  type QrCodeRootProviderProps,
} from './qr-code-root-provider.svelte'
export {
  default as QrCodeRoot,
  type QrCodeRootBaseProps,
  type QrCodeRootProps,
} from './qr-code-root.svelte'
export { qrCodeAnatomy } from './qr-code.anatomy'
export { useQrCodeContext, type UseQrCodeContext } from './use-qr-code-context'
export { useQrCode, type UseQrCodeProps, type UseQrCodeReturn } from './use-qr-code.svelte'

export * as QrCode from './qr-code'
