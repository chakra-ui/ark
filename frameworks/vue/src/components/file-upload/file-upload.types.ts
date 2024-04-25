import type * as fileUpload from '@zag-js/file-upload'

export interface RootProps {
  /**
   * The accept file types
   */
  accept?: string | Record<string, string[]>
  /**
   * Whether to allow drag and drop in the dropzone element
   */
  allowDrop?: boolean
  /**
   * The default camera to use when capturing media
   */
  capture?: 'user' | 'environment'
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether to accept directories, only works in webkit browsers
   */
  directory?: boolean
  /**
   * Whether the file input is disabled
   */
  disabled?: boolean
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements. Useful for composition.
   */
  ids?: Partial<{
    root: string
    dropzone: string
    hiddenInput: string
    trigger: string
    label: string
    item(id: string): string
    itemName(id: string): string
    itemSizeText(id: string): string
    itemPreview(id: string): string
  }>
  /**
   * The current locale. Based on the BCP 47 definition.
   * @default "en-US"
   */
  locale?: string
  /**
   * The maximum file size in bytes
   */
  maxFileSize?: number
  /**
   * The maximum number of files
   */
  maxFiles?: number
  /**
   * The minimum file size in bytes
   */
  minFileSize?: number
  /**
   * The name of the underlying file input
   */
  name?: string
  /**
   * The localized messages to use.
   */
  translations?: fileUpload.IntlTranslations
  /**
   * Function to validate a file
   */
  validate?: (file: File) => fileUpload.FileError[]
}

export type RootEmits = {
  /**
   * Function called when the file is accepted
   */
  fileAccept: [details: fileUpload.FileAcceptDetails]
  /**
   * Function called when the value changes, whether accepted or rejected
   */
  fileChange: [details: fileUpload.FileChangeDetails]
  /**
   * Function called when the file is rejected
   */
  fileReject: [details: fileUpload.FileRejectDetails]
}
