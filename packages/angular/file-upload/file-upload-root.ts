import type * as fileUpload from '@zag-js/file-upload'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  FileAcceptDetails,
  FileChangeDetails,
  FileError,
  FileMimeType,
  FileRejectDetails,
  FileUploadElementIds,
  FileUploadIntlTranslations,
  FileValidateDetails,
} from './file-upload.types'
import { ARK_FILE_UPLOAD_CONTEXT } from './use-file-upload-context'
import { useFileUpload, type UseFileUploadReturn } from './use-file-upload'

const optionalNumberAttribute = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === '') return undefined
  const next = numberAttribute(value)
  return Number.isFinite(next) ? next : undefined
}

@Directive({
  selector: '[arkFileUpload]',
  standalone: true,
  exportAs: 'arkFileUpload',
  providers: [{ provide: ARK_FILE_UPLOAD_CONTEXT, useExisting: forwardRef(() => ArkFileUploadRoot) }],
})
export class ArkFileUploadRoot implements UseFileUploadReturn {
  /** The unique identifier of the file upload. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the file-upload parts. */
  readonly elementIds: InputSignal<FileUploadElementIds | undefined> = input<FileUploadElementIds | undefined>(
    undefined,
    { alias: 'ids' },
  )
  /** The localized strings for the file upload. */
  readonly translations: InputSignal<FileUploadIntlTranslations | undefined> = input<
    FileUploadIntlTranslations | undefined
  >(undefined)
  /** The name attribute of the hidden file input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The accept file types. */
  readonly accept: InputSignal<Record<string, string[]> | FileMimeType | FileMimeType[] | undefined> = input<
    Record<string, string[]> | FileMimeType | FileMimeType[] | undefined
  >(undefined)
  /** Whether the file input is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the file input is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the file input is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the file input is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to allow drag and drop in the dropzone element. */
  readonly allowDrop: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** The maximum file size in bytes. */
  readonly maxFileSize: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(
    undefined,
    { transform: optionalNumberAttribute },
  )
  /** The minimum file size in bytes. */
  readonly minFileSize: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(
    undefined,
    { transform: optionalNumberAttribute },
  )
  /** The maximum number of files. */
  readonly maxFiles: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(
    undefined,
    { transform: optionalNumberAttribute },
  )
  /** Whether to prevent the drop event on the document. */
  readonly preventDocumentDrop: InputSignalWithTransform<boolean | undefined, unknown> = input<
    boolean | undefined,
    unknown
  >(undefined, {
    transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)),
  })
  /** Function to validate a file. */
  readonly validate: InputSignal<((file: File, details: FileValidateDetails) => FileError[] | null) | undefined> =
    input<((file: File, details: FileValidateDetails) => FileError[] | null) | undefined>(undefined)
  /** The default accepted files when rendered. Use when uncontrolled. */
  readonly defaultAcceptedFiles: InputSignal<File[] | undefined> = input<File[] | undefined>(undefined)
  /** The controlled accepted files. */
  readonly acceptedFiles: ModelSignal<File[] | undefined> = model<File[] | undefined>(undefined)
  /** The default camera to use when capturing media. */
  readonly capture: InputSignal<'user' | 'environment' | undefined> = input<'user' | 'environment' | undefined>(
    undefined,
  )
  /** Whether to accept directories (webkit browsers only). */
  readonly directory: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** Function to transform the accepted files. */
  readonly transformFiles: InputSignal<((files: File[]) => Promise<File[]>) | undefined> = input<
    ((files: File[]) => Promise<File[]>) | undefined
  >(undefined)
  /** The locale (BCP 47). */
  readonly locale: InputSignal<string | undefined> = input<string | undefined>(undefined)

  /** Emits when the file selection changes. */
  readonly fileChange: OutputEmitterRef<FileChangeDetails> = output<FileChangeDetails>()
  /** Emits when files are accepted. */
  readonly fileAccept: OutputEmitterRef<FileAcceptDetails> = output<FileAcceptDetails>()
  /** Emits when files are rejected. */
  readonly fileReject: OutputEmitterRef<FileRejectDetails> = output<FileRejectDetails>()

  private readonly machine = useFileUpload({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      translations: this.translations(),
      name: this.name(),
      accept: this.accept(),
      disabled: this.disabled() || undefined,
      required: this.required() || undefined,
      invalid: this.invalid() || undefined,
      readOnly: this.readOnly() || undefined,
      allowDrop: this.allowDrop(),
      maxFileSize: this.maxFileSize(),
      minFileSize: this.minFileSize(),
      maxFiles: this.maxFiles(),
      preventDocumentDrop: this.preventDocumentDrop(),
      validate: this.validate(),
      defaultAcceptedFiles: this.defaultAcceptedFiles(),
      acceptedFiles: this.acceptedFiles(),
      capture: this.capture(),
      directory: this.directory(),
      transformFiles: this.transformFiles(),
      locale: this.locale(),
      onFileChange: (details: FileChangeDetails) => {
        if (!filesShallowEqual(this.acceptedFiles(), details.acceptedFiles)) {
          this.acceptedFiles.set([...details.acceptedFiles])
        }
        this.fileChange.emit(details)
      },
      onFileAccept: (details: FileAcceptDetails) => this.fileAccept.emit(details),
      onFileReject: (details: FileRejectDetails) => this.fileReject.emit(details),
    }),
  })

  readonly state: Signal<fileUpload.Service['state']> = this.machine.state
  readonly api: Signal<fileUpload.Api> = this.machine.api
  readonly service: fileUpload.Service = this.machine.service
  readonly send: fileUpload.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}

const filesShallowEqual = (a: File[] | undefined, b: File[]): boolean =>
  Array.isArray(a) && a.length === b.length && a.every((file, index) => file === b[index])
