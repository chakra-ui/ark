import { InjectionToken, inject } from '@angular/core'
import type { UseFileUploadReturn } from './use-file-upload'

export const ARK_FILE_UPLOAD_CONTEXT = new InjectionToken<UseFileUploadReturn>('ARK_FILE_UPLOAD_CONTEXT')

export function injectArkFileUploadContext(): UseFileUploadReturn {
  return inject(ARK_FILE_UPLOAD_CONTEXT)
}
