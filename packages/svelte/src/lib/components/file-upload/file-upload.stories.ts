import type { Meta } from '@storybook/svelte'

import AcceptedFileTypesExample from './examples/accepted-file-types.svelte'
import BasicExample from './examples/basic.svelte'
import ClearTriggerExample from './examples/clear-trigger.svelte'
import DirectoryUploadExample from './examples/directory-upload.svelte'
import DropzoneExample from './examples/dropzone.svelte'
import ErrorHandlingExample from './examples/error-handling.svelte'
import FormUsageExample from './examples/form-usage.svelte'
import InitialFilesExample from './examples/initial-files.svelte'
import MediaCaptureExample from './examples/media-capture.svelte'
import PastingFilesExample from './examples/pasting-files.svelte'
import RejectedFilesExample from './examples/rejected-files.svelte'
import RootProviderExample from './examples/root-provider.svelte'
import TransformFilesExample from './examples/transform-files.svelte'
import WithFieldExample from './examples/with-field.svelte'

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

export const Dropzone = {
  render: () => ({
    Component: DropzoneExample,
  }),
}

export const ErrorHandling = {
  render: () => ({
    Component: ErrorHandlingExample,
  }),
}

export const FormUsage = {
  render: () => ({
    Component: FormUsageExample,
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

export const PastingFiles = {
  render: () => ({
    Component: PastingFilesExample,
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

export const TransformFiles = {
  render: () => ({
    Component: TransformFilesExample,
  }),
}

export const WithField = {
  render: () => ({
    Component: WithFieldExample,
  }),
}
