import * as fileUpload from '@zag-js/file-upload'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { FileUploadElementIds, FileUploadMachineProps } from './file-upload.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseFileUploadProps extends OptionalId<Omit<FileUploadMachineProps, 'dir' | 'getRootNode'>> {}

export type UseFileUploadReturn = UseMachineReturn<fileUpload.Service['state'], fileUpload.Api, fileUpload.Service>

export interface UseFileUploadOptions {
  context: () => UseFileUploadProps
}

type FileUploadContext = Record<string, unknown>
type FileUploadSchema = fileUpload.Machine extends Machine<infer TSchema> ? TSchema : never

type MergedContext = {
  dir: 'ltr' | 'rtl'
  locale: string
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: FileUploadElementIds
  disabled?: boolean
  invalid?: boolean
  required?: boolean
} & Omit<UseFileUploadProps, 'id' | 'ids' | 'disabled' | 'invalid' | 'required'>

export function useFileUpload(options: UseFileUploadOptions): UseFileUploadReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('file-upload')

  return useMachine<FileUploadSchema, fileUpload.Api>({
    machine: fileUpload.machine,
    context: () => {
      const props = options.context()
      const id = props.id ?? fallbackId
      const merged: MergedContext = {
        dir: locale.dir,
        locale: locale.locale,
        getRootNode: environment.getRootNode,
        ...props,
        id,
      }
      if (field) {
        const fieldIds = field.ids
        const baseIds = (props.ids ?? {}) as NonNullable<FileUploadElementIds>
        merged.ids = {
          label: fieldIds.label,
          hiddenInput: fieldIds.control,
          ...baseIds,
        }
        const disabled = Boolean(props.disabled) || field.disabled()
        const invalid = Boolean(props.invalid) || field.invalid()
        const required = Boolean(props.required) || field.required()
        merged.disabled = disabled || undefined
        merged.invalid = invalid || undefined
        merged.required = required || undefined
      }
      return merged as unknown as FileUploadContext
    },
    connect: (service, normalize) => fileUpload.connect(service, normalize),
  })
}
