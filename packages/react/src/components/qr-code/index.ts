export type { QrCodeGenerateOptions, QrCodeGenerateResult } from '@zag-js/qr-code'
export { QrCodeContext, type QrCodeContextProps } from './qr-code-context.tsx'
export {
  QrCodeDownloadTrigger,
  type QrCodeDownloadTriggerBaseProps,
  type QrCodeDownloadTriggerProps,
} from './qr-code-download-trigger.tsx'
export { QrCodeFrame, type QrCodeFrameBaseProps, type QrCodeFrameProps } from './qr-code-frame.tsx'
export { QrCodeOverlay, type QrCodeOverlayBaseProps, type QrCodeOverlayProps } from './qr-code-overlay.tsx'
export { QrCodePattern, type QrCodePatternBaseProps, type QrCodePatternProps } from './qr-code-pattern.tsx'
export { QrCodeRoot, type QrCodeRootBaseProps, type QrCodeRootProps } from './qr-code-root.tsx'
export {
  QrCodeRootProvider,
  type QrCodeRootProviderBaseProps,
  type QrCodeRootProviderProps,
} from './qr-code-root-provider.tsx'
export { qrCodeAnatomy } from './qr-code.anatomy.ts'
export { useQrCode, type UseQrCodeProps, type UseQrCodeReturn } from './use-qr-code.ts'
export { useQrCodeContext, type UseQrCodeContext } from './use-qr-code-context.ts'

export * as QrCode from './qr-code.ts'
