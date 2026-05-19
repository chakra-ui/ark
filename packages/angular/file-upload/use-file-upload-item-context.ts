import { InjectionToken, inject, type Signal } from '@angular/core'
import type { FileUploadItemType } from './file-upload.types'

export interface ArkFileUploadItemContext {
  file: Signal<File>
  type: Signal<FileUploadItemType | undefined>
}

export const ARK_FILE_UPLOAD_ITEM_CONTEXT = new InjectionToken<ArkFileUploadItemContext>('ARK_FILE_UPLOAD_ITEM_CONTEXT')

export function injectArkFileUploadItemContext(): ArkFileUploadItemContext {
  const context = inject(ARK_FILE_UPLOAD_ITEM_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_FILE_UPLOAD_ITEM_CONTEXT not found: a file-upload item part directive must be used inside an [arkFileUploadItem] directive.',
    )
  }
  return context
}
