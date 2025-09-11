import type { Meta } from '@storybook/svelte'

import AcceptedFileTypesExample from './examples/accepted-file-types.svelte'
import BasicExample from './examples/basic.svelte'
import ClearTriggerExample from './examples/clear-trigger.svelte'
import DirectoryUploadExample from './examples/directory-upload.svelte'
import DragAndDropExample from './examples/drag-and-drop.svelte'
import ErrorHandlingExample from './examples/error-handling.svelte'
import FileTransformationsExample from './examples/file-transformations.svelte'
import InitialFilesExample from './examples/initial-files.svelte'
import MediaCaptureExample from './examples/media-capture.svelte'
import RejectedFilesExample from './examples/rejected-files.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import SingleFileExample from './examples/single-file.svelte'
import SizeLimitsExample from './examples/size-limits.svelte'
import ValidationExample from './examples/validation.svelte'
import WithFieldExample from './examples/with-field.svelte'
import WithPasteExample from './examples/with-paste.svelte'

const meta: Meta = {
  title: 'Components/FileUpload',
}

export default meta

export const Basic = {
  render: () => ({
    Component: BasicExample,
  }),
}

export const AcceptedFileTypes = {
  render: () => ({
    Component: AcceptedFileTypesExample,
  }),
}

export const ClearTrigger = {
  render: () => ({
    Component: ClearTriggerExample,
  }),
}

export const DragAndDrop = {
  render: () => ({
    Component: DragAndDropExample,
  }),
}

export const ErrorHandling = {
  render: () => ({
    Component: ErrorHandlingExample,
  }),
}

export const FileTransformations = {
  render: () => ({
    Component: FileTransformationsExample,
  }),
}

export const DirectoryUpload = {
  render: () => ({
    Component: DirectoryUploadExample,
  }),
}

export const InitialFiles = {
  render: () => ({
    Component: InitialFilesExample,
  }),
}

export const MediaCapture = {
  render: () => ({
    Component: MediaCaptureExample,
  }),
}

export const RejectedFiles = {
  render: () => ({
    Component: RejectedFilesExample,
  }),
}

export const RootProvider = {
  render: () => ({
    Component: RootProviderExample,
  }),
}

export const SingleFile = {
  render: () => ({
    Component: SingleFileExample,
  }),
}

export const SizeLimits = {
  render: () => ({
    Component: SizeLimitsExample,
  }),
}

export const Validation = {
  render: () => ({
    Component: ValidationExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}

export const WithPaste = {
  render: () => ({
    Component: WithPasteExample,
  }),
}
